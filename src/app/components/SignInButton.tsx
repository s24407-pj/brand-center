import {signIn} from '@/auth'

export default function SignInButton() {
	return (
		<form
			action={async () => {
				'use server'
				await signIn('google')
			}}
		>
			<button className="btn btn-ghost" type="submit">
				Sign in
			</button>
		</form>
	)
}
