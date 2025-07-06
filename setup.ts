import {type BrowserContext, chromium, type FullConfig} from '@playwright/test';
import {GlobalConstants} from './constants/global.constants';
import {MainPage} from "./pages/main.page";
import {LoginPage} from "./pages/login.page";
import {DashboardPage} from "./pages/dashboard.page";

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch({});
    const context = await browser.newContext({
        baseURL: config.projects[0].use.baseURL,
    });
    try {
        await context.tracing.start({screenshots: true, snapshots: true});
        await createUserState(
            context,
            GlobalConstants.BASE_USER_STORAGE_NAME,
            process.env.USERNAME,
            process.env.PASSWORD,
        );
        return async () => {
            await browser.close();
        };
    } catch (e) {
        await context.tracing.stop({
            path: './target/test-results/setup/setup-login-trace.zip',
        });
        await browser.close();
        throw e;
    }
}

export async function createUserState(
    context: BrowserContext,
    statename: string,
    username: string,
    password: string,
) {
    const page = await context.newPage();
    await MainPage(page).open();
    await MainPage(page).header.clickSignIn();
    await LoginPage(page).signIn({username, password});
    await DashboardPage(page).expectLoaded();
    await context.storageState({path: statename});
}

export default globalSetup;
