import { BasePage } from './BasePage.js';

export class SearchPage extends BasePage {
    constructor(page) {
        super(page);

        this.searchInput = page.locator('#small-searchterms');
        this.searchButton = page.locator('input.search-box-button');
        this.searchResults = page.locator('.product-grid .product-title a');
    }

    async searchProduct(productName) {
        await this.navigateTo('/');
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    getResultProductLink(productName) {
        return this.page.locator('.product-grid .product-title').getByRole('link', {
            name: productName,
            exact: true,
        });
    }
}