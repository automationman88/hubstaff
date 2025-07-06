import {anonymousTest as test} from "./test.base";
import {expect} from "@playwright/test";
import {getConfirmationLinkFromGmail} from "../utils/gmail";

test('Signup for 14-day trial', async ({app: {mainPage, signUpPage, welcomePage}}) => {
    await mainPage.open();
    await mainPage.header.click14DayTrial();
    const user = await signUpPage.signUp()
    const link = await getConfirmationLinkFromGmail(user.email);
    expect(link).toBeTruthy();
    await welcomePage.open(link);
    await welcomePage.expectCreateOrgButtonVisible();
    await welcomePage.expectRequestJoinButtonVisible();
})