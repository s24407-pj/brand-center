/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: '*.cdninstagram.com',
			},
			{
				hostname: '*.googleusercontent.com',
			},
		],
	},
}

export default nextConfig
