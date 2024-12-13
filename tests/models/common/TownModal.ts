import { VISIBILITY_TIMEOUT } from '@/tests/utils/constants'
import { Locator, Page } from '@playwright/test'

import { BaseModel } from '../BaseModel'

export class TownModal extends BaseModel {
  readonly title: Locator
  readonly acceptButton: Locator
  readonly changeButton: Locator
  readonly townName: Locator

  constructor(page: Page) {
    // Use a more reliable selector that doesn't depend on CSS module hashes
    super(page, page.locator('[class*="ConfirmTownModal_item"]'))
    this.title = this.selector.locator('[class*="ConfirmTownModal_h1"]')
    this.acceptButton = this.selector.locator(
      '[class*="ConfirmTownModal_accept"]',
    )
    this.changeButton = this.selector.locator(
      '[class*="ConfirmTownModal_cancel"]',
    )
    this.townName = this.selector.locator(
      '[class*="ConfirmTownModal_h1"] b'
    )
  }

  async isVisible() {
    await this.selector.waitFor({
      state: 'visible',
      timeout: VISIBILITY_TIMEOUT,
    })

    return true
  }

  async accept() {
    await this.acceptButton.click()
    await this.selector.waitFor({
      state: 'hidden',
      timeout: VISIBILITY_TIMEOUT,
    })
    return true
  }

  async getTownName() {
    const name = await this.townName.innerText()
    return name
  }
}
