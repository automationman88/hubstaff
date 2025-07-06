import {Page} from "@playwright/test";
import {OneTimeAmount} from "./components/one.time.amount";

export const FinancialsPage = (page: Page) => {
    return {
        oneTimeAmount: OneTimeAmount(page),
    }
}