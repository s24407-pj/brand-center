'use client'

import {useTheme} from 'next-themes'
import './ThemeToggle.css'

export default function ThemeToggle() {
	const {theme, setTheme} = useTheme()

	return (
		<button
			className="btn btn-ghost"
			aria-label="toggle theme"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			<svg
				className="svg-theme-toggle h-5 w-5"
				aria-hidden="true"
				viewBox="0 0 24 24"
			>
				<mask className="moon" id="moon-mask">
					<rect x="0" y="0" width="100%" height="100%" fill="white" />
					<circle cx="24" cy="10" r="6" fill="black" />
				</mask>
				<circle
					className="sun"
					cx="12"
					cy="12"
					r="6"
					mask="url(#moon-mask)"
					fill="currentColor"
				/>
				<g className="sun-beams" stroke="currentColor" strokeWidth="2px">
					<line x1="12" y1="1" x2="12" y2="3" />
					<line x1="12" y1="21" x2="12" y2="23" />
					<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
					<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
					<line x1="1" y1="12" x2="3" y2="12" />
					<line x1="21" y1="12" x2="23" y2="12" />
					<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
					<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
				</g>
			</svg>
		</button>
	)
}
