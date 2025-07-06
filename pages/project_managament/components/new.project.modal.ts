import {Page} from "@playwright/test";
import {FakerUtil} from "../../../utils/faker.util";

export const NewProjectModal = (page: Page) => {
    const rootModalLocator = page.locator('.modal-dialog');
    return {

        async fillProjectName(name: string = FakerUtil.appendUUID('Project_')) {
            await page.getByPlaceholder('Add project names separated by new lines').fill(name);
            return name;
        },

        async save() {
            await rootModalLocator.locator('.modal-footer .btn.btn-primary').click()
        }
    }
}