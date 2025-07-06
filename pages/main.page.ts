import {Page} from "@playwright/test";
import {Header} from "./components/header";
import {waitForResponse} from "../utils/api";

export const MainPage = (page: Page) => {
    return {
        header: Header(page),

        async open(url: string = '/') {
            const promise = waitForResponse(page, 'lead-flows-config/v1', 'GET', [200]);
            await page.goto(url);
            await promise;
        },
    }
}