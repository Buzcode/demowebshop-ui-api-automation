import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
    constructor(page) {
        super(page);

        this.qtyInput = page.locator('.add-to-cart-panel .qty-input');
        this.addToCartButton = page.locator('.add-to-cart-panel .add-to-cart-button');
        this.notificationBar = page.locator('#bar-notification');
        this.cartHeaderLink = page.locator('#topcartlink a');
    }

    async openCategory(categoryName) {
        await this.page.locator('.top-menu').getByRole('link', { name: categoryName }).click();
    }

    async selectProduct(productName) {
        await this.page.locator('.product-title').getByRole('link', { name: productName, exact: true }).click();
    }

    async addProductToCart(quantity = 1) {
        await this.qtyInput.fill(String(quantity));
        await this.addToCartButton.click();
    }

    async goToCart() {
        await this.cartHeaderLink.click();
    }
}