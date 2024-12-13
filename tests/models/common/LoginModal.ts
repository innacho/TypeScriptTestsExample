import { VISIBILITY_TIMEOUT } from '@/tests/utils/constants'
import { Locator, Page } from '@playwright/test'

import { BaseModel } from '../BaseModel'

export class LoginModal extends BaseModel {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator
  readonly heading: Locator

  constructor(page: Page) {
    super(page, page.locator('.login-modal'))
    this.usernameInput = page.locator('#username')
    this.passwordInput = page.locator('#password')
    this.submitButton = page.locator('button[type="submit"]')
    this.heading = page.getByText('Вход в приложение')
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.submitButton.click()
    await this.selector.waitFor({
      state: 'hidden',
      timeout: VISIBILITY_TIMEOUT,
    })
  }

  async isVisible() {
    await this.selector.waitFor({
      state: 'visible',
      timeout: VISIBILITY_TIMEOUT,
    })

    return true
  }

  async verifyHeading() {
    await this.heading.waitFor({
      state: 'visible',
      timeout: VISIBILITY_TIMEOUT,
    })
    return true
  }
}
