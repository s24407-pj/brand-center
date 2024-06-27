'use client'
import {useRouter} from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function DropdownMenu() {
	const router = useRouter()

	return (
		<div className="dropdown">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-circle btn-ghost"
				aria-label="menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M4 6h16M4 12h16M4 18h7"
					/>
				</svg>
			</div>
			<div className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
				<ul> 
					<li tabIndex={0} aria-label="homepage">
						<a onClick={() => router.push('/')}>Homepage</a>
					</li>
					<li tabIndex={0} aria-label="about">
						<a onClick={() => router.push('/about')}>About</a>
					</li>
					<li tabIndex={0} aria-label="shop">
						<a onClick={() => router.push('/shop')}>Shop</a>
					</li>
				</ul>
				<div className="divider m-0"></div>
				<div className="flex flex-row">
					<ThemeToggle />
					<button className="btn btn-ghost" aria-label="language">
						En
					</button>
				</div>
			</div>
		</div>
	)
}
