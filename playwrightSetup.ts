import { chromium } from '@playwright/test'

import config, { GLOBAL_TIMEOUT } from '../playwright.config'
import { PageModel } from './models/PageModel'
import { performLogin } from './utils/auth.utils'
import { VISIBILITY_TIMEOUT } from './utils/constants'

async function warmupApplication(appPage: PageModel) {
  appPage.page.setDefaultTimeout(GLOBAL_TIMEOUT)
  await appPage.goto()
  await appPage.page.evaluate(() => localStorage.clear())
  await appPage.goto()
  await performLogin(appPage.page)
  await appPage.page.waitForTimeout(VISIBILITY_TIMEOUT)
}

export default async function globalSetup() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  const appPage = new PageModel(page, config.use?.baseURL)
  await warmupApplication(appPage)
  await browser.close()
}
