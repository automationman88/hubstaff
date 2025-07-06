import {Page} from "@playwright/test";
import {waitForResponse} from "../../utils/api";
import {LoginPage} from "../login.page";

export const Header = (page: Page) => {
    return {
        async click14DayTrial() {
            const promise = waitForResponse(page, 'livechat-public/v1/message', 'GET', [200]);
            await page.locator('[data-name="Free 14-day trial"][href="/signup"]').first().click();
            await promise;
        },

        async clickSignIn() {
            await page.getByTestId('sign_in_button').click();
            return LoginPage(page);
        }
    }
}