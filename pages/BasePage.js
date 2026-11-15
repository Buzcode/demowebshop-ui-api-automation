export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(path = '/') {
        await this.page.goto(path);
    }

    async getPageUrl() {
        return this.page.url();
    }
}