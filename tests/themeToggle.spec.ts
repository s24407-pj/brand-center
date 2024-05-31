import {test, expect, Page} from '@playwright/test'

const getColorScheme = async (page: Page) => {
	return await page.evaluate(() => {
		const html = document.querySelector('html') as Element
		return getComputedStyle(html).getPropertyValue('color-scheme')
	})
}

const getDataTheme = async (page: Page) => {
	return await page.getAttribute('html', 'data-theme')
}

const toggleTheme = async (page: Page) => {
	await page.click('[aria-label="menu"]')
	await page.click('[aria-label="toggle theme"]')
}

test('Toggle theme', async ({page}) => {
	await page.goto('/')
	await toggleTheme(page)

	const colorScheme = await getColorScheme(page)
	const dataTheme = await getDataTheme(page)

	expect(dataTheme === 'light' || dataTheme === 'dark').toBeTruthy()
	expect(colorScheme === dataTheme).toBeTruthy()

	await toggleTheme(page)

	const newColorScheme = await getColorScheme(page)
	const newDataTheme = await getDataTheme(page)

	expect(newColorScheme === 'light' || newColorScheme === 'dark').toBeTruthy()
	expect(newColorScheme === newDataTheme).toBeTruthy()
	expect(newColorScheme).not.toBe(colorScheme)
})
