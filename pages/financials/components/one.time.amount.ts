import {expect, Page} from "@playwright/test";
import {FakerUtil} from "../../../utils/faker.util";
import {PaymentModal} from "./payment.modal";
import {Notifications} from "../../components/notifications";

export const OneTimeAmount = (page: Page) => {
    return {
        paymentModal: PaymentModal(page),
        notifications: Notifications(page),
        async open() {
            await page.goto(`${process.env.APP_URL}/organizations/${process.env.ORGANIZATION_ID}/team_payments/bonus`);
        },

        async selectFirstMember() {
            await page.getByRole('combobox').click();
            const item = page.getByRole('treeitem').first();
            const textContent = item.textContent();
            await item.click();
            await item.press('Escape')
            return textContent;
        },

        async fillAmountPerMember(amount: string = FakerUtil.randomNumber()) {
            const locator = page.locator('#team_payment_total_amount');
            await locator.fill(amount)
            await expect(locator).toHaveValue(amount);
            return amount;
        },

        async fillNote(note: string = FakerUtil.randomWord()) {
            const locator = page.locator('#team_payment_note');
            await locator.fill(note)
            await expect(locator).toHaveValue(note);
            return note;
        },

        async clickCreatePayment() {
            await page.locator('.btn-bonus-payment-wizard-dialog').click();
        }
    }
}