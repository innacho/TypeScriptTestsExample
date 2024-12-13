import { Page } from '@playwright/test'

import { LoginModal } from '../models/common/LoginModal'

export async function performLogin(
  page: Page,
  username = 'test123456',
  password = 'test123456',
) {
  const loginModal = new LoginModal(page)
  await loginModal.login(username, password)
}
