'use client'

import {createContext, useContext, useState, ReactNode} from 'react'

type Product = {
	id: string
	name: string
	price: number
	quantity: number
}

type ShopCartContextType = {
	shopCart: Product[]
	addToCart: (product: Product) => void
}

const ShopCartContext = createContext<ShopCartContextType | undefined>(
	undefined,
)

export const ShopCartProvider = ({children}: {children: ReactNode}) => {
	const [shopCart, setShopCart] = useState<Product[]>([])

	const addToCart = (product: Product) => {
		setShopCart((prevCart) => [...prevCart, product])
	}

	return (
		<ShopCartContext.Provider value={{shopCart, addToCart}}>
			{children}
		</ShopCartContext.Provider>
	)
}

export const useShopCart = () => {
	const context = useContext(ShopCartContext)
	if (context === undefined) {
		throw new Error('useShopCart must be used within a ShopCartProvider')
	}
	return context
}
