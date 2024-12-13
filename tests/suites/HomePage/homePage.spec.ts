import { expect, test, Page } from '@playwright/test'

import { performLogin } from '../../utils/auth.utils'
import { HomePage } from './HomePage'
import { cities } from '../../utils/params'
import { cityCoordinates } from '@/store/slices/utils'
import { setupGeolocationContext } from '@/tests/utils/helper'

const locationTownId = 5

test.describe('Test Home Page', async () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.goto()
    await performLogin(page)
  })

  test('View home page', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.goto()

    const townModal = await homePage.verifyTownModal()
    expect(await townModal.isVisible()).toBeTruthy()
  })

  test('Close town modal and confirm town value', async ({ context, page }) => {

    await setupGeolocationContext(context, true, cityCoordinates[locationTownId])

    const homePage = new HomePage(page)

    await checkTown(page, homePage, cities[locationTownId].name, cities[locationTownId].urlPath)

  })

  test('Deny geolocation permission and set default location', async ({ context, page }) => {

    await setupGeolocationContext(context, false, cityCoordinates[locationTownId])

    const homePage = new HomePage(page)

    await checkTown(page, homePage, cities.default.name, cities.default.urlPath)
  })
})

async function checkTown(page: Page, homePage: HomePage, townName: string, townSlug: string) {

  await homePage.goto()

  const townModal = await homePage.verifyTownModal()
  const pageTownName = await townModal.getTownName()

  expect(pageTownName).toBe(townName)

  await townModal.accept()

  const selectedTownLocator = await homePage.getSelectedTownLocator()
  expect(selectedTownLocator).toBeVisible()
  const selectedTownName = await homePage.getSelectedTown()

  expect(selectedTownName).toBe(townName)

  await page.waitForURL(`**/${townSlug}`);

  const pageUrl = page.url()

  expect(pageUrl).toContain(townSlug)
}
