import {Page} from '@playwright/test';

export const waitForResponse = (
    page: Page,
    urlToInclude: string,
    method: 'GET' | 'PUT' | 'POST' = 'GET',
    status: number[] = [200],
) =>
    page.waitForResponse(
        (response) =>
            response.request().method() === method &&
            response.url().includes(urlToInclude) &&
            status.includes(response.status()),
        {timeout: 10_000},
    );
