import {expect, Page} from "@playwright/test";

export const WelcomePage = (page: Page) => {
    const createOrgButton = page.locator('.create-org-btn');
    const requestJoinButton = page.locator('[href="/welcome/request_join"]');
    return {
        async open(url: string) {
            await page.goto(url);
            await this.expectLoaded();
        },

        async expectLoaded() {
            await expect(page.locator('.title').first()).toHaveText('Welcome to Hubstaff!')
        },

        async expectCreateOrgButtonVisible() {
            await expect(createOrgButton).toBeVisible();
        },

        async expectRequestJoinButtonVisible() {
            await expect(requestJoinButton).toBeVisible();
        },
    }
}