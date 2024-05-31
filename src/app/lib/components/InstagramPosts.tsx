// components/InstagramPosts.tsx
'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'

interface Post {
	id: string
	caption?: string
	media_type: 'IMAGE' | 'VIDEO'
	media_url: string
	permalink: string
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
					setPosts(data.data) // Instagram API returns posts in a 'data' field
				} else {
					setError(data.error)
				}
			} catch (err: any) {
				setError(err.message)
			}
		}

		fetchInstagramPosts()
	}, [])

	if (error) {
		return <div>Error: {error}</div>
	}

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{posts.map((post) => (
				<div key={post.id} className="card w-96 bg-base-100 shadow-xl">
					<figure>
						{post.media_type === 'IMAGE' && (
							<Image
								src={post.media_url}
								alt={post.caption || 'Instagram Post'}
								width={400}
								height={400}
								className="h-auto w-full"
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
