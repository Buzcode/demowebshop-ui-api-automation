import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage.js';
import { LoginPage } from '../pages/LoginPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';

test('Q2: Register new customer, log in, add product to cart, and verify cart', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    const uniqueEmail = `student_${Date.now()}@testmail.com`;
    const password = 'Password@123';
    const category = 'Books';
    const productName = 'Computing and Internet';
    const quantity = '2';

    // 1. Register a new customer
    await registerPage.openRegisterPage();
    await registerPage.registerUser({
        gender: 'female',
        firstName: 'Mahmuda',
        lastName: 'Test',
        email: uniqueEmail,
        password: password,
    });

    await expect(registerPage.successMessage).toBeVisible();
    await expect(registerPage.successMessage).toContainText('Your registration completed');
    await registerPage.clickContinue();

    // 2. Log out and log in
    await registerPage.logout();
    await loginPage.openLoginPage();
    await loginPage.login(uniqueEmail, password);
    await expect(loginPage.logoutLink).toBeVisible();

    await productPage.openCategory(category);
    await productPage.selectProduct(productName);
    await productPage.addProductToCart(quantity);

    await expect(productPage.notificationBar).toBeVisible();
    await expect(productPage.notificationBar).toContainText('The product has been added to your shopping cart');

    await productPage.goToCart();
    const productRow = cartPage.getProductRow(productName);
    await expect(productRow.locator('.product-name')).toHaveText(productName);
    await expect(productRow.locator('.qty-input')).toHaveValue(quantity);

    const screenshot = await page.screenshot({ fullPage: true });
    await test.info().attach('Q2 - Product and Quantity in Cart', {
        body: screenshot,
        contentType: 'image/png',
    });
});