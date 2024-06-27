'use client'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {useDebouncedCallback} from 'use-debounce'

export default function SearchFilter() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const {replace} = useRouter()

	// Inside the Search Component...
	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams)
		if (term) {
			params.set('query', term)
		} else {
			params.delete('query')
		}
		replace(`${pathname}?${params.toString()}`)
	}, 300)

	return (
		<div className="form-control">
			<input
				type="text"
				placeholder="Search"
				className="input input-bordered w-24 md:w-auto"
				onChange={(e) => {
					handleSearch(e.target.value)
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
		</div>
	)
}
