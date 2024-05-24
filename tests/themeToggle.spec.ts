import {test, expect} from '@playwright/test'

test('Toggle theme', async ({page}) => {
	await page.goto('/')
	await page.click('[aria-label="toggle theme"]')

	const colorScheme = await page.evaluate(() => {
		const html = document.querySelector('html') as Element
		return getComputedStyle(html).getPropertyValue('color-scheme')
	})
	const dataTheme = await page.getAttribute('html', 'data-theme')

	expect(dataTheme === 'light' || dataTheme === 'dark').toBeTruthy()
	expect(colorScheme === dataTheme).toBeTruthy()

	await page.click('[aria-label="toggle theme"]')

	const newColorScheme = await page.evaluate(() => {
		const html = document.querySelector('html') as Element
		return getComputedStyle(html).getPropertyValue('color-scheme')
	})
	const newDataTheme = await page.getAttribute('html', 'data-theme')

	expect(colorScheme === 'light' || colorScheme === 'dark').toBeTruthy()
	expect(newColorScheme === newDataTheme).toBeTruthy()
	expect(newColorScheme).not.toBe(colorScheme)
})
