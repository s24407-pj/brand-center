import test, {expect} from '@playwright/test'

test('Navigation smoke test', async ({page}) => {
	await page.goto('/')
	const menu = page.getByLabel('menu')

	await menu.click()
	await page.click('[aria-label="about"]')
	await page.waitForURL('http://localhost:3000/about')
	expect(page.url()).toBe('http://localhost:3000/about')

	await page.click('[aria-label="logo"]')
	await page.waitForURL('http://localhost:3000/')
	expect(page.url()).toBe('http://localhost:3000/')

	await menu.click()
	await page.click('[aria-label="shop"]')
	await page.waitForURL('http://localhost:3000/shop')
	expect(page.url()).toBe('http://localhost:3000/shop')

	await menu.click()
	await page.click('[aria-label="homepage"]')
	await page.waitForURL('http://localhost:3000/')
	expect(page.url()).toBe('http://localhost:3000/')
})
