'use client'
import React, {createContext, useContext, useState, ReactNode} from 'react'

type FilterPostsContextType = {
	filterWord: string
	setFilterWord: (word: string) => void
}

const FilterPostsContext = createContext<FilterPostsContextType | undefined>(
	undefined,
)

export const FilterPostsProvider: React.FC<{children: ReactNode}> = ({
	children,
}) => {
	const [filterWord, setFilterWord] = useState('')

	return (
		<FilterPostsContext.Provider value={{filterWord, setFilterWord}}>
			{children}
		</FilterPostsContext.Provider>
	)
}

export const useFilterPosts = () => {
	const context = useContext(FilterPostsContext)
	if (!context) {
		throw new Error('useFilter must be used within a FilterProvider')
	}
	return context
}
