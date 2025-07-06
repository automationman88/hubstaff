import {hubstaffTest as test} from "./test.base";

test('Add/create project', async ({app: {projectsPage}}) => {
    await projectsPage.open();
    const newProjectModal = await projectsPage.clickAddProject();
    const projectName = await newProjectModal.fillProjectName();
    await newProjectModal.save();
    await projectsPage.notifications.expectTextVisible('Project created')
    await projectsPage.expectProjectByText(projectName)
})