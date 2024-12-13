import type { Locator, Page } from '@playwright/test'
import { cities , groups } from '@/tests/utils/params'
import { PageModel } from '../../models/PageModel'
import { urlTemplates } from '@/shared/utils/urls'


export class GroupPage extends PageModel {
  readonly groupName: Locator
  readonly groupTownId: number
  readonly groupPath: string

  constructor(page: Page, id: number) {
    const townId = groups[id as keyof typeof groups].location.town
    const path = cities[townId as keyof typeof cities].urlPath + urlTemplates.group(id)
    super(page, path)
    this.groupName = this.page.locator('//main/div[2]/div/h1')
    this.groupTownId = townId
    this.groupPath = path
  }

  async getGroupName() {
    return await this.groupName.innerText()
  }

  async getGroupPath() {
    return this.groupPath
  }

  async isGroupNameVisible() {
    return await this.groupName.isVisible()
  }

}
