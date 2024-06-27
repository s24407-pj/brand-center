'use client'
import {useShoppingCart} from '@/context/ShoppingCartContext'
import {useEffect, useState} from 'react'
import {FiShoppingCart} from 'react-icons/fi'

export default function ShoppingCart() {
	const {shoppingCart} = useShoppingCart()
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		if (shoppingCart.length > 0) {
			setAnimate(true)
			setTimeout(() => setAnimate(false), 500)
		}
	}, [shoppingCart.length])
	return (
		<button className="btn btn-circle btn-ghost" aria-label="notifications">
			<div className={`indicator ${animate ? 'animate-scale-in-out' : ''}`}>
				<FiShoppingCart className="size-5" />
				{shoppingCart.length > 0 && (
					<span className={'badge indicator-item badge-primary badge-xs'}>
						{shoppingCart.length}
					</span>
				)}
			</div>
		</button>
	)
}
