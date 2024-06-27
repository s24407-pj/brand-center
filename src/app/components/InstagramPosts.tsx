'use client'

import {useShoppingCart} from '@/context/ShoppingCartContext'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {AiFillInstagram} from 'react-icons/ai'
import SkeletonPost from './SkeletonPost'
import {useFilterPosts} from '@/context/FilterPostsContext'
import {usePathname} from 'next/navigation'

type Post = {
	id: string
	caption?: string
	media_type: 'IMAGE' | 'VIDEO'
	media_url: string
	permalink: string
	hashTags?: string[]
	isAvailableToBuy?: boolean
}

export default function InstagramPosts() {
	const [posts, setPosts] = useState<Post[]>([])
	const [error, setError] = useState<string | null>(null)
	const {addToCart} = useShoppingCart()
	const {filterHashtag, setFilterHashtag} = useFilterPosts()
	const pathname = usePathname()

	useEffect(() => {
		if (pathname === '/shop') {
			setFilterHashtag('#product')
		} else {
			setFilterHashtag('')
		}
	}, [pathname, setFilterHashtag])

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
	const filteredPosts = filterHashtag
		? posts.filter((post) => post.hashTags?.includes(filterHashtag))
		: posts

	if (error) {
		return <div>Error: {error}</div>
	}

	if (posts.length === 0 && !error) {
		return (
			<div className="mx-auto mt-16 flex flex-wrap justify-center gap-4 p-10">
				{[...Array(3)].map((_, index) => (
					<SkeletonPost key={index} />
				))}
			</div>
		)
	}

	return (
		<div className="mx-auto mt-16 flex flex-wrap justify-center gap-4 p-10">
			{filteredPosts.map((post) => (
				<div
					key={post.id}
					className="card relative min-w-80 flex-1 flex-grow-0 shadow-xl md:min-w-96"
				>
					<a href={post.permalink}>
						<AiFillInstagram className="absolute right-2 top-2 z-10 size-8" />
					</a>
					<figure>
						{post.media_type === 'IMAGE' && (
							<Image
								src={post.media_url}
								alt={post.caption || 'Instagram Post'}
								width={500}
								height={500}
								quality={50}
							/>
						)}
						{post.media_type === 'VIDEO' && (
							<video
								muted
								autoPlay
								loop
								src={post.media_url}
								className="h-auto w-full"
							/>
						)}
					</figure>
					<div className="card-body">
						{post.caption && <p>{post.caption}</p>}

						{post.hashTags?.includes('#product') && (
							<button
								onClick={() => {
									addToCart({
										id: post.id,
										name: post.caption || 'Product',
										image: post.media_url,
										price: 10,
										quantity: 1,
									})
								}}
								rel="noopener noreferrer"
								className="btn btn-primary mt-2 hover:scale-110"
							>
								Add to cart
							</button>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
