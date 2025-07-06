import {Page} from "@playwright/test";

export const LoginPage = (page: Page) => {
    return {

        async fillUserEmail(username: string) {
            await page.locator('#user_email').fill(username);
        },

        async fillUserPassword(password: string) {
            await page.locator('#user_password').fill(password);
        },

        async clickSignIn() {
            await page.locator('[type="submit"]').click()
        },

        async signIn(user: { username: string, password: string } = {
            username: process.env.USERNAME,
            password: process.env.PASSWORD
        }) {
            await this.fillUserEmail(user.username);
            await this.fillUserPassword(user.password);
            await this.clickSignIn();
            // Optionally, you can add an assertion to verify successful login
            // await expect(page.locator('selector-for-logged-in-element')).toBeVisible();
        }
    }
}