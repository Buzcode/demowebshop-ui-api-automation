import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test('Q3: E2E Product search, add to cart, checkout, and view order details', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const productName = 'Computing and Internet';
    const quantity = '3';

    // 1. Search for product and verify it appears in search results
    await searchPage.searchProduct(productName);
    const resultLink = searchPage.getResultProductLink(productName);
    await expect(resultLink).toBeVisible();

    // 2. Open product, increase quantity, and add to cart
    await resultLink.click();
    await productPage.addProductToCart(quantity);
    await expect(productPage.notificationBar).toBeVisible();
    await expect(productPage.notificationBar).toContainText('The product has been added to your shopping cart');

    // 3. Go to cart, check agree checkbox, and click checkout
    await productPage.goToCart();
    await cartPage.agreeTermsAndCheckout();

    // 4. Checkout as Guest -> fill Billing -> complete checkout to Order Confirm
    await checkoutPage.proceedAsGuest();
    await checkoutPage.fillBillingAddress({
        firstName: 'Mahmuda',
        lastName: 'Test',
        email: `guest_${Date.now()}@testmail.com`,
        country: 'Bangladesh',
        city: 'Dhaka',
        address1: '123 Test Road',
        zipCode: '1207',
        phone: '01700000000',
    });
    await checkoutPage.completeRemainingStepsAndConfirm();

    // 5. Verify order confirmation and open order details
    await expect(checkoutPage.orderSuccessMessage).toBeVisible();
    await expect(checkoutPage.orderSuccessMessage).toContainText(
        'Your order has been successfully processed!'
    );

    await checkoutPage.openOrderDetails();
    await expect(checkoutPage.orderInformationHeading).toBeVisible();
    await expect(checkoutPage.orderNumberText).toBeVisible();
    await expect(page.locator('.data-table')).toContainText(productName);

    // 6. Attach screenshot to HTML & Allure reports
    const screenshot = await page.screenshot({ fullPage: true });
    await test.info().attach('Q3 - Order Details Confirmation', {
        body: screenshot,
        contentType: 'image/png',
    });
});