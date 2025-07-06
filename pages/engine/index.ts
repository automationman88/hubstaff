import {Page} from '@playwright/test';
import {MainPage} from "../main.page";
import {SignUpPage} from "../sign.up.page";
import {WelcomePage} from "../welcome.page";
import {LoginPage} from "../login.page";
import {DashboardPage} from "../dashboard.page";
import {ProjectsPage} from "../project_managament/projects.page";
import {FinancialsPage} from "../financials/financials.page";
import {PaymentSummaryPage} from "../financials/payment.summary";

export const Application = (page: Page) => ({
    mainPage: MainPage(page),
    signUpPage: SignUpPage(page),
    welcomePage: WelcomePage(page),
    loginPage: LoginPage(page),
    dashboardPage: DashboardPage(page),
    projectsPage: ProjectsPage(page),
    financialsPage: FinancialsPage(page),
    paymentSummaryPage: PaymentSummaryPage(page)
});
