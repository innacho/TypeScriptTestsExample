import { Page } from '@playwright/test'
import qs from 'qs'

import { BaseModel } from './BaseModel'
import { TownModal } from './common/TownModal'

type QueryParams = Record<string, string | number | undefined>

export class PageModel extends BaseModel {
  readonly path: string
  protected query: QueryParams

  constructor(page: Page, path = '', query: QueryParams = {}) {
    // Use global locator for pages
    super(page, page.locator('body'))
    this.path = path
    this.query = query
  }

  async goto(query: QueryParams = {}) {
    this.query = { ...this.query, ...query }
    await this.page.goto(
      `${this.path.trim()}?${qs.stringify(this.query, { encode: false })}`,
    )
  }

  async verifyTownModal() {
    const townModal = new TownModal(this.page)
    await townModal.isVisible()
    return townModal
  }
}
