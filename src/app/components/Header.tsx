import {auth} from '@/auth'
import DropdownMenu from './DropdownMenu'
import ShoppingCart from './ShoppingCart'
import SignInButton from './SignInButton'
import DropdownProfileMenu from './DropdownProfileMenu'

export default async function Header() {
	const session = await auth()
	const user = session?.user

	return (
		<header className="navbar fixed top-0 z-50 border-b-2 border-[var(--fallback-bc,oklch(var(--bc)/0.1))] bg-base-100">
			<div className="navbar-start">
				<DropdownMenu user={user} />
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost text-2xl" href="/">
					Brand Center
				</a>
			</div>
			<div className="navbar-end gap-3">
				<ShoppingCart />

				{user ? (
					<DropdownProfileMenu profileImage={user.image} />
				) : (
					<SignInButton />
				)}
			</div>
		</header>
	)
}
