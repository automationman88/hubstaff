import {expect, Page} from "@playwright/test";
import {User} from "./interfaces/user";
import {FakerUtil} from "../utils/faker.util";
import {waitForResponse} from "../utils/api";

export const SignUpPage = (page: Page) => {
    return {
        async expectLoaded() {
            await expect(page.locator('.hsds-signup__container')).toBeVisible();
        },

        async fillFirstName(firstName: string) {
            await page.getByTestId('first_name').fill(firstName);
        },

        async fillLastName(lastName: string) {
            await page.getByTestId('last_name').fill(lastName);
        },

        async fillWorkEmail(email: string) {
            await page.getByTestId('email').fill(email);
        },

        async fillPassword(password: string) {
            await page.getByTestId('password').fill(password);
        },

        async acceptTerms() {
            const promise = waitForResponse(page, 'px.ads.linkedin.com/wa/', 'POST', [204]);
            await page.locator('[for="hubstaff_terms"] [class*="checkbox-icon"]').click();
            await promise;
        },

        async clickCreateMyAccount() {
            await page.getByTestId('create_my_account').click();
        },

        async signUp(user
                     :
                     User = {
                         firstName: FakerUtil.randomFirstName(),
                         lastName: FakerUtil.randomLastName(),
                         email: FakerUtil.randomEmail(),
                         password: FakerUtil.randomPassword(),
                     }
        ) {
            await this.expectLoaded();
            await this.acceptTerms();
            await this.fillFirstName(user.firstName);
            await this.fillLastName(user.lastName);
            await this.fillWorkEmail(user.email);
            await this.fillPassword(user.password);
            await this.clickCreateMyAccount();
            await expect(page.locator('h1.title')).toHaveText('Verify your email')
            return user;
        }
    }
}