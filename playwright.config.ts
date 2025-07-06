import {defineConfig} from '@playwright/test';
import {existsSync} from 'fs';
import * as dotenv from 'dotenv';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
if (existsSync('.env') || existsSync('.env.ci')) {
    dotenv.config({
        path: '.env',
    });
}

const baseConfig = {
    use: {
        channel: 'chrome',
        headless: !!process.env.CI,
        viewport: {width: 1725, height: 1080},
        launchOptions: {
            args: ['--window-position=0,0'],
        },
        permissions: ['clipboard-read', 'clipboard-write'],
    },
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    globalSetup: './setup.ts',
    timeout: 50 * 1000,
    expect: {
        /**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
        timeout: 30 * 1000,
    },
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 2 : 1,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [
        [process.env.CI ? 'blob' : 'html', {open: 'never'}],
        ['list'],
    ],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: process.env.BASE_URL,
        testIdAttribute: 'data-testid',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: process.env.CI ? 'retain-on-failure' : 'off',
        video: process.env.CI ? 'off' : 'on',
        screenshot: {
            mode: 'only-on-failure',
            fullPage: true,
        },
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'hubstaff',
            testDir: './tests',
            use: {
                ...baseConfig.use,
            },
        },
    ],
});
