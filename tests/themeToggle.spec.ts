import {test, expect} from '@playwright/test'

test('toggle theme', async ({page}) => {
	await page.goto('/')
	await page.click('[aria-label="Toggle theme"]')

	const colorScheme = await page.evaluate(() => {
		const html = document.querySelector('html') as Element
		return getComputedStyle(html).getPropertyValue('color-scheme')
	})
	expect(colorScheme === 'dark' || colorScheme === 'light').toBeTruthy()
	await page.click('[aria-label="Toggle theme"]')
	const newColorScheme = await page.evaluate(() => {
		const html = document.querySelector('html') as Element
		return getComputedStyle(html).getPropertyValue('color-scheme')
	})
	expect(colorScheme === 'dark' || colorScheme === 'light').toBeTruthy()
	expect(newColorScheme).not.toBe(colorScheme)
})
