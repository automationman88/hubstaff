import {Page} from "@playwright/test";

export const PaymentModal = (page: Page) => {
    return {

        async clickCreatePayment() {
            await page.locator('.btn-mark-timesheets-as-paid').click();
        },

        async dismiss() {
            await page.locator('[data-dismiss="modal"]').filter({visible: true}).first().click();
        }
    }
}