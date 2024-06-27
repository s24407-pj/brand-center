import {auth} from '@/auth'
import DropdownMenu from './DropdownMenu'
import ShoppingCart from './ShoppingCart'
import SignInButton from './SignInButton'
import DropdownProfileMenu from './DropdownProfileMenu'
import Logo from './Logo'
import SearchFilter from './SearchFilter'

export default async function Header() {
	const session = await auth()
	const user = session?.user

	return (
		<header className="navbar fixed top-0 z-50 border-b-2 border-[var(--fallback-bc,oklch(var(--bc)/0.1))] bg-base-100">
			<div className="navbar-start">
				<DropdownMenu />
			</div>
			<div className="navbar-center hidden md:block">
				<Logo />
			</div>
			<div className="navbar-end gap-3">
				<SearchFilter />
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
