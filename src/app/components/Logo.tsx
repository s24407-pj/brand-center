'use client'
import {useRouter} from 'next/navigation'

export default function Logo() {
	const router = useRouter()
	return (
		<a
			aria-label="logo"
			className="btn btn-ghost text-2xl"
			onClick={() => router.push('/')}
		>
			Brand Center
		</a>
	)
}
