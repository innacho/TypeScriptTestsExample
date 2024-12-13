import type { Locator, Page } from '@playwright/test'

import { PageModel } from '../../models/PageModel'

export class HomePage extends PageModel {
  readonly header: Locator
  readonly selectedTown: Locator

  constructor(page: Page) {
    super(page, '/')
    this.header = this.page.locator('header')
    this.selectedTown = this.page.locator('header button span')
  }

  async getSelectedTownLocator() {
    return this.selectedTown
  }

  async getSelectedTown() {
    const town = await this.selectedTown.innerText()
    return town
  }

  async isHeaderVisible() {
    await this.header.isVisible()
  }
}
