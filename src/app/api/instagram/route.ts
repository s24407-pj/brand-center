// app/api/instagram/route.ts
import {NextResponse} from 'next/server'

export async function GET() {
	try {
		const response = await fetch(
			`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${process.env.IG_TOKEN}`,
		)

		if (!response.ok) {
			throw new Error('Failed to fetch Instagram posts')
		}

		const data = await response.json()
		return NextResponse.json(data)
	} catch (error: any) {
		return NextResponse.json({error: error.message}, {status: 500})
	}
}
