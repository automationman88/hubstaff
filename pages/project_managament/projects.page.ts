import {expect, Page} from "@playwright/test";
import {NewProjectModal} from "./components/new.project.modal";
import {Notifications} from "../components/notifications";

export const ProjectsPage = (page: Page) => {
    return {
        notifications: Notifications(page),
        async open() {
            await page.goto(`${process.env.APP_URL}/organizations/${process.env.ORGANIZATION_ID}/projects?status=active`);
        },

        async clickAddProject() {
            await page.locator('[data-original-title="Add new project to the organization"]').click();
            return NewProjectModal(page);
        },

        async expectProjectByText(projectName: string) {
            await expect(page.locator('.project-name', {hasText: projectName})).toBeVisible();
        }
    }
}