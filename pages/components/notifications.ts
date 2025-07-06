import {expect, Page} from "@playwright/test";

export const Notifications = (page: Page) => {
    return {
        async expectTextVisible(text: string) {
            await expect(page.locator('.jGrowl-message')).toContainText(text)
        }
    }
}