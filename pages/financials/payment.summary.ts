import {expect, Page} from "@playwright/test";

export const PaymentSummaryPage = (page: Page) => {
    return {
        async expectGroupBy(value: string) {
            await expect(page.locator(`[role="combobox"] [title="${value}"]`)).toBeVisible();
        },

        async expectTableData(data: {
            member: string,
            rateType: string,
            hours: string,
            status: string,
            amount: string
        }) {
            const expectedHeaders = ['Member', 'Rate type', 'Hours', 'Status', 'Amount'];
            const headerLocator = page.locator('table thead tr th');

            for (let i = 0; i < expectedHeaders.length; i++) {
                await expect(headerLocator.nth(i)).toHaveText(expectedHeaders[i]);
            }

            const row = page.locator('table tbody tr').first();
            await expect(row.locator('td').nth(0)).toHaveText(data.member);
            await expect(row.locator('td').nth(1)).toContainText(data.rateType);
            await expect(row.locator('td').nth(2)).toHaveText(data.hours);
            await expect(row.locator('td').nth(3)).toContainText(data.status);
            await expect(row.locator('td').nth(4)).toHaveText(new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2
            }).format(Number(data.amount)));
        }
    }
}