const STORAGE_KEY = 'theme'
type Theme = 'light' | 'dark'
// you may want to look into the user's preference instead, with:
// window.matchMedia('(prefers-color-scheme: dark)').matches
const defaultTheme: Theme = 'light'

const getTheme: () => Theme = () =>
	localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'

const setTheme = (theme: Theme) => {
	document.documentElement.dataset.theme = theme
}

// set early so no page flashes / CSS is made aware
setTheme(getTheme())

const themeObserver = new MutationObserver(() => {
	const nextTheme = document.documentElement.dataset.theme
	if (nextTheme) {
		localStorage.setItem(STORAGE_KEY, nextTheme)
	}
})
themeObserver.observe(document.documentElement, {
	attributes: true,
	attributeFilter: ['data-theme'],
})

const toggleTheme = () => {
	const currentTheme = getTheme()
	const nextTheme = currentTheme === 'dark' ? 'light' : 'dark'
	setTheme(nextTheme)
}

window.toggleTheme = toggleTheme
