'use client'

import {dark} from '@clerk/themes'
import {SignInButton, SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import {useTheme} from 'next-themes'

export default function ClerkProfile() {
	const {theme} = useTheme()

	return (
		<button className={'btn btn-ghost'} aria-label="profile">
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<UserButton
					appearance={{baseTheme: theme === 'dark' ? dark : undefined}}
				/>
			</SignedIn>
		</button>
	)
}
