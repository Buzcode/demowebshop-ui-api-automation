import { BasePage } from './BasePage.js';

export class RegisterPage extends BasePage {
    constructor(page) {
        super(page);

        this.registerLink = page.getByRole('link', { name: 'Register' });
        this.genderMale = page.locator('#gender-male');
        this.genderFemale = page.locator('#gender-female');
        this.firstNameInput = page.locator('#FirstName');
        this.lastNameInput = page.locator('#LastName');
        this.emailInput = page.locator('#Email');
        this.passwordInput = page.locator('#Password');
        this.confirmPasswordInput = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');
        this.successMessage = page.locator('.result');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
    }

    async openRegisterPage() {
        await this.navigateTo('/');
        await this.registerLink.click();
    }

    async registerUser({ gender = 'female', firstName, lastName, email, password }) {
        if (gender.toLowerCase() === 'male') {
            await this.genderMale.check();
        } else {
            await this.genderFemale.check();
        }

        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.registerButton.click();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async logout() {
        await this.logoutLink.click();
    }
}