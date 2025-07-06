import {expect, Page} from "@playwright/test";

export const DashboardPage = (page: Page) => {
    return {
        async expectLoaded() {
            await expect(page.locator('.dashboard-header h2')).toContainText('Dashboard');
        }
    }
}