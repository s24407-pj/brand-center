'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import SkeletonPost from './SkeletonPost'
import {FaInstagramSquare} from 'react-icons/fa'

interface Post {
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

	useEffect(() => {
		async function fetchInstagramPosts() {
			try {
				const response = await fetch('/api/instagram')
				const data = await response.json()

				if (response.ok) {
					setPosts(data.data)
					analyzeHashtags(posts)
				} else {
					setError(data.error)
				}
			} catch (err: any) {
				setError(err.message)
			}
		}

		fetchInstagramPosts()
	}, [posts])

	const analyzeHashtags = (posts: Post[]) => {
		null
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
