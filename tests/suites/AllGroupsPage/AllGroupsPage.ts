import type { Locator, Page } from '@playwright/test'

import { PageModel } from '../../models/PageModel'
import { urlTemplates } from '@/shared/utils/urls'
import { GroupPage } from '../GroupPage/GroupPage'

export class AllGroupsPage extends PageModel {
  groupLink: Locator
  readonly townPath: string

  constructor(page: Page, path: string) {
    super(page, path + urlTemplates.allGroups)
    this.townPath = path
    this.groupLink = this.selector.locator('')
  }

  async clickGroup(groupId: number) {
    await this.setGroupLink(groupId)
    await this.groupLink.click()
    await this.page.waitForTimeout(5000)
    return new GroupPage(this.page, groupId)
  }

  async setGroupLink(id: number) {
    const groupPath = this.townPath + urlTemplates.group(id)
    const groupLink = `a[href="/${groupPath}"]`
    this.groupLink = this.selector.locator(groupLink)
  }

}
