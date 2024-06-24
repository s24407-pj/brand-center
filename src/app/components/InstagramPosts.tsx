'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import SkeletonPost from './SkeletonPost'
import {FaInstagramSquare} from 'react-icons/fa'
import {useShopCart} from '@/context/ShopCartContext'

type Post = {
	id: string
	caption?: string
	media_type: 'IMAGE' | 'VIDEO'
	media_url: string
	permalink: string
	hashTags?: string[]
	isAvailableToBuy?: boolean
}

const InstagramPosts = () => {
	const [posts, setPosts] = useState<Post[]>([])
	const [error, setError] = useState<string | null>(null)
	const {addToCart} = useShopCart()

	useEffect(() => {
		async function fetchInstagramPosts() {
			try {
				const response = await fetch('/api/instagram')
				const data = await response.json()

				if (response.ok) {
					const postsWithHashTags = analyzeHashtags(data.data)
					setPosts(postsWithHashTags)
				} else {
					setError(data.error)
				}
			} catch (err: any) {
				setError(err.message)
			}
		}

		fetchInstagramPosts()
	}, [])

	const analyzeHashtags = (posts: Post[]): Post[] => {
		return posts.map((post) => {
			if (post.caption) {
				const hashtags = post.caption.match(/#[a-zA-Z0-9_]+/g)
				if (hashtags) {
					post.hashTags = hashtags.map((tag) => tag.toLowerCase())
				}
			}
			return post
		})
	}

	if (error) {
		return <div>Error: {error}</div>
	}

	if (posts.length === 0 && !error) {
		return (
			<div className="mx-auto flex flex-wrap justify-center gap-4">
				{[...Array(3)].map((_, index) => (
					<SkeletonPost key={index} />
				))}
			</div>
		)
	}

	return (
		<div className="mx-auto flex flex-wrap justify-center gap-4">
			{posts.map((post) => (
				<div
					key={post.id}
					className=" card relative min-w-80 flex-1 flex-grow-0 bg-base-100  shadow-xl md:min-w-96"
				>
					<a href={post.permalink}>
						<FaInstagramSquare className="absolute right-2 top-2 size-8" />
					</a>
					<figure>
						{post.media_type === 'IMAGE' && (
							<Image
								src={post.media_url}
								alt={post.caption || 'Instagram Post'}
								width={1080}
								height={1350}
							/>
						)}
						{post.media_type === 'VIDEO' && (
							<video controls src={post.media_url} className="h-auto w-full" />
						)}
					</figure>
					<div className="card-body">
						{post.caption && <h2 className="card-title">{post.caption}</h2>}

						{post.hashTags?.includes('#product') && (
							<button
								onClick={() => {
									addToCart({
										id: post.id,
										name: post.caption || 'Instagram Post',
										price: 10,
										quantity: 1,
									})
								}}
								rel="noopener noreferrer"
								className="btn btn-primary mt-2"
							>
								Buy
							</button>
						)}
						<a
							href={post.permalink}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-primary mt-2"
						>
							View on Instagram
						</a>
					</div>
				</div>
			))}
		</div>
	)
}

export default InstagramPosts
