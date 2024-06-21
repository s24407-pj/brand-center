import InstagramPosts from './components/InstagramPosts'

export default function Page() {
	return (
		<div className="hero min-h-screen">
			<div className="hero-overlay bg-opacity-60"></div>
			<div className="hero-content text-center text-neutral-content">
				<InstagramPosts />
			</div>
		</div>
	)
}
