import type {Config} from 'tailwindcss'
import daisyui from 'daisyui'
import themes from 'daisyui/src/theming/themes'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],

	theme: {
		extend: {
			keyframes: {
				'scale-animation': {
					'0%, 100%': {
						transform: 'scale(1)',
					},
					'50%': {
						transform: 'scale(1.2)',
					},
				},
			},
			animation: {
				'scale-in-out': 'scale-animation 0.5s ease',
			},
		},
	},
	daisyui: {
		themes: [
			{
				light: {
					...themes.lofi,
				},
			},
			{
				dark: {
					...themes.business,
				},
			},
		],
	},
	plugins: [daisyui],
}
export default config
