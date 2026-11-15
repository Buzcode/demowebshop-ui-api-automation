import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test('Q1: Invalid Login displays error message and user stays logged out', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Open Login Page
    await loginPage.openLoginPage();

    // Attempt login with invalid credentials
    await loginPage.login('mahmuda@aust.edu', 'WrongPassword123');

    //Verify appropriate error message is displayed
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(
        'Login was unsuccessful. Please correct the errors and try again.'
    );
    await expect(loginPage.errorMessage).toContainText('No customer account found');

    //Verify the user is NOT logged in
    await expect(loginPage.loginLink).toBeVisible();
    await expect(loginPage.logoutLink).not.toBeVisible();
    await expect(page).toHaveURL(/\/login/);

    //Attach screenshot to HTML & Allure reports
    const screenshot = await page.screenshot({ fullPage: true });
    await test.info().attach('Q1 - Invalid Login Error', {
        body: screenshot,
        contentType: 'image/png',
    });
});