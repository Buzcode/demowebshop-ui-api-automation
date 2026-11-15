import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
    constructor(page) {
        super(page);

        this.cartProductNames = page.locator('.cart .product-name');
        this.cartQtyInputs = page.locator('.cart .qty-input');
        this.termsCheckbox = page.locator('#termsofservice');
        this.checkoutButton = page.locator('#checkout');
    }

    getProductRow(productName) {
        return this.page.locator('.cart-item-row', { hasText: productName });
    }

    async agreeTermsAndCheckout() {
        await this.termsCheckbox.check();
        await this.checkoutButton.click();
    }
}