import { expect, test } from '@playwright/test'
import { cityCoordinates } from '../../../store/slices/utils'
import { HomePage } from '../HomePage/HomePage'
import { GroupPage } from '../GroupPage/GroupPage'
import { cities, groups } from '../../utils/params'
import { performLogin } from '../../utils/auth.utils'
import { setupGeolocationContext } from '@/tests/utils/helper'
import { AllGroupsPage } from '../AllGroupsPage/AllGroupsPage'

const groupId = 6
const townId = groups[groupId].location.town

test.describe('Navigation tests', async () => {

    test.beforeEach(async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.goto()
        await performLogin(page)
    })

    test('Open group page via direct link', async ({ context, page }) => {
        await setupGeolocationContext(context, true, cityCoordinates[townId as keyof typeof cityCoordinates])
        const groupPage = new GroupPage(page, groupId)
        await groupPage.goto()
        const townModal = await groupPage.verifyTownModal()
        const townName = await townModal.getTownName()

        expect(townName).toBe(groups[groupId].townName)

        await townModal.accept()

        expect(await groupPage.isGroupNameVisible()).toBeTruthy()
        expect(await groupPage.getGroupName()).toContain(groups[groupId].name)
    })

    test('Open group page from all-groups', async ({ context, page }) => {

        await setupGeolocationContext(context, true, cityCoordinates[townId as keyof typeof cityCoordinates])
        const path = cities[townId as keyof typeof cities].urlPath

        const allGroupsPage = new AllGroupsPage(page, path)
        await allGroupsPage.goto()

        const townModal = await allGroupsPage.verifyTownModal()
        const townName = await townModal.getTownName()

        expect(townName).toBe(groups[groupId].townName)

        await townModal.accept()
        const groupPage = await allGroupsPage.clickGroup(groupId)

        expect(await groupPage.isGroupNameVisible()).toBeTruthy()
        expect(await groupPage.getGroupName()).toContain(groups[groupId].name)
    })

})