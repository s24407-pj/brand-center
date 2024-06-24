'use client'

import {FiShoppingCart} from 'react-icons/fi'
import ThemeToggle from './ThemeToggle'
import {useShopCart} from '@/context/ShopCartContext'
import {useEffect, useState} from 'react'

const Header = () => {
	const {shopCart} = useShopCart()
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		if (shopCart.length > 0) {
			setAnimate(true)
			setTimeout(() => setAnimate(false), 500)
		}
	}, [shopCart.length])
	return (
		<header className="navbar bg-base-100">
			<div className="navbar-start">
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
					<ul
						tabIndex={0}
						className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
					>
						<li>
							<a>Homepage</a>
						</li>
						<li>
							<a>Shop</a>
						</li>
						<li>
							<ul className="flex">
								<li>
									<ThemeToggle />
								</li>
								<li>
									<button
										className="btn btn-circle btn-ghost"
										aria-label="language"
									>
										En
									</button>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost text-xl" href="/">
					Brand Center
				</a>
			</div>
			<div className="navbar-end">
				<button className="btn btn-circle btn-ghost" aria-label="notifications">
					<div
						className={`indicator ${animate ? ' animate-scale-in-out' : ''}`}
					>
						<FiShoppingCart className="size-5" />
						{shopCart.length > 0 && (
							<span className={' badge indicator-item badge-primary badge-xs '}>
								{shopCart.length}
							</span>
						)}
					</div>
				</button>
			</div>
		</header>
	)
}

export default Header
