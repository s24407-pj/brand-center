'use client'

import {createContext, useContext, useState, ReactNode} from 'react'

type Product = {
	id: string
	name: string
	image: string
	price: number
	quantity: number
}

type ShoppingCartContextType = {
	shoppingCart: Product[]
	addToCart: (product: Product) => void
	setQuantity: (quantity: number,id:string) => void
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
	undefined,
)

export const ShoppingCartProvider = ({children}: {children: ReactNode}) => {
	const [shoppingCart, setShoppingCart] = useState<Product[]>([])

	const addToCart = (product: Product) => {
		setShoppingCart((prevCart) => [...prevCart, product])
	}
	const setQuantity = (quantity: number, id: string) => {
		setShoppingCart((prevCart) => {
			const updatedCart = prevCart.map((product) => {
				if (product.id === id) {
					return {...product, quantity}
				}
				return product
			})
			return updatedCart
		})
	
	}

	return (
		<ShoppingCartContext.Provider value={{shoppingCart, addToCart,setQuantity}}>
			{children}
		</ShoppingCartContext.Provider>
	)
}

export const useShoppingCart = () => {
	const context = useContext(ShoppingCartContext)
	if (context === undefined) {
		throw new Error(
			'useShoppingCart must be used within a ShoppingCartProvider',
		)
	}
	return context
}
