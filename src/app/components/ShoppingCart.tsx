'use client'

import {useShoppingCart} from '@/context/ShoppingCartContext'
import {useRouter} from 'next/navigation'
import {useEffect, useState} from 'react'
import {FaMinus, FaPlus} from 'react-icons/fa6'
import {FiShoppingCart} from 'react-icons/fi'

export default function ShoppingCart() {
	const {shoppingCart, setQuantity} = useShoppingCart()
	const [animate, setAnimate] = useState(false)
	const [totalPrice, setTotalPrice] = useState(0)
	const router = useRouter()

	useEffect(() => {
		setTotalPrice(
			shoppingCart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0),
		)
	}, [shoppingCart])

	useEffect(() => {
		if (shoppingCart.length > 0) {
			setAnimate(true)
			setTimeout(() => setAnimate(false), 500)
		}
	}, [shoppingCart.length])
	return (
		<div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
			<button className="btn btn-circle btn-ghost">
				<div className={`indicator ${animate ? 'animate-scale-in-out' : ''}`}>
					<FiShoppingCart className="size-5" />
					{shoppingCart.length > 0 && (
						<span className={'badge indicator-item badge-primary badge-xs'}>
							{shoppingCart.length}
						</span>
					)}
				</div>
			</button>
			<div
				tabIndex={0}
				className="menu dropdown-content z-[1] flex min-h-20 min-w-72 flex-col gap-2 rounded-box bg-base-100 p-5 text-lg shadow"
			>
				{shoppingCart.length === 0 ? (
					<p className="p-5 text-center text-lg">Your cart is empty</p>
				) : (
					<>
						{shoppingCart.map((item, index) => (
							<>
								<div key={index} className="flex flex-row gap-4">
									<img src={item.image} width={100} height={100} />
									<div className="flex flex-col">
										<p className="text-nowrap">Product name</p>
										<div className="flex flex-row gap-4">
											<button
												className="btn btn-circle btn-ghost"
												onClick={() => setQuantity(item.quantity - 1, item.id)}
											>
												<FaMinus />
											</button>
											<p> {item.quantity} </p>
											<button
												className="btn btn-circle btn-ghost"
												onClick={() => setQuantity(item.quantity + 1, item.id)}
											>
												<FaPlus />
											</button>
										</div>
										<p>{item.price}$ per item</p>
									</div>
								</div>
								<div className="divider"></div>
							</>
						))}
						<div className="flex flex-col gap-4">
							<p>Total price: {totalPrice}$</p>
							<button
								className="btn btn-primary hover:scale-110"
								onClick={() => router.push('/checkout')}
							>
								Checkout
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
