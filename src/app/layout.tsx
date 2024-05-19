
import './global.css'

import {Metadata} from 'next'
import Header from './lib/components/Header'



import Footer from './lib/components/Footer'

export const metadata: Metadata = {
	title: 'Brand Center',
	description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html lang="en">
			<body>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	)
}
