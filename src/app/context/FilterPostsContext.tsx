'use client'
import React, {createContext, useContext, useState, ReactNode} from 'react'

type FilterPostsContextType = {
	filterHashtag: string
	setFilterHashtag: (hashtag: string) => void
}

const FilterPostsContext = createContext<FilterPostsContextType | undefined>(
	undefined,
)

export const FilterPostsProvider: React.FC<{children: ReactNode}> = ({
	children,
}) => {
	const [filterHashtag, setFilterHashtag] = useState('')

	return (
		<FilterPostsContext.Provider value={{filterHashtag, setFilterHashtag}}>
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
