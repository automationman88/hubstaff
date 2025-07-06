import {anonymousTest as test} from "./test.base";

test('Sign in from the Marketing page navigation bar', async ({app: {mainPage, loginPage, dashboardPage}}) => {
    await mainPage.open();
    await mainPage.header.clickSignIn();
    await loginPage.signIn();
    await dashboardPage.expectLoaded();
})