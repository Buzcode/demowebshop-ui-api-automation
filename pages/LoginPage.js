import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        // Locators
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.emailInput = page.getByLabel('Email:');
        this.passwordInput = page.getByLabel('Password:');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.errorMessage = page.locator('.validation-summary-errors');
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
    }

    async openLoginPage() {
        await this.navigateTo('/');
        await this.loginLink.click();
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}