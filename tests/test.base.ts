import {test as base} from '@playwright/test';
import {GlobalConstants} from '../constants/global.constants';
import {Application} from '../pages/engine';

export const hubstaffTest = base.extend<{
    app: ReturnType<typeof Application>;
}>({
    page: async ({context, page}, use, testInfo) => {
        await use(page);
    },
    app: async ({page}, use) => {
        await use(Application(page));
    },
    storageState: async ({}, use) => {
        await use(GlobalConstants.BASE_USER_STORAGE_NAME);
    },
});

export const anonymousTest = base.extend<{
    app: ReturnType<typeof Application>;
}>({
    app: async ({page}, use) => {
        await use(Application(page));
    },
    storageState: async ({}, use) => {
        await use({cookies: [], origins: []});
    },
});
