import {signOut} from '@/auth'

export function SignOutButton() {
	return (
		<form
			action={async () => {
				'use server'
				await signOut()
			}}
		>
			<button className="btn btn-ghost whitespace-nowrap" type="submit">
				Sign out
			</button>
		</form>
	)
}
