import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);

        this.checkoutAsGuestButton = page.getByRole('button', { name: 'Checkout as Guest' });

        //Billing Address
        this.firstName = page.locator('#BillingNewAddress_FirstName');
        this.lastName = page.locator('#BillingNewAddress_LastName');
        this.email = page.locator('#BillingNewAddress_Email');
        this.country = page.locator('#BillingNewAddress_CountryId');
        this.city = page.locator('#BillingNewAddress_City');
        this.address1 = page.locator('#BillingNewAddress_Address1');
        this.zipCode = page.locator('#BillingNewAddress_ZipPostalCode');
        this.phone = page.locator('#BillingNewAddress_PhoneNumber');
        this.billingContinue = page.locator('#billing-buttons-container input[value="Continue"]');

        // Confirm buttons
        this.shippingAddressContinue = page.locator('#shipping-buttons-container input[value="Continue"]');
        this.shippingMethodContinue = page.locator('#shipping-method-buttons-container input[value="Continue"]');
        this.paymentMethodContinue = page.locator('#payment-method-buttons-container input[value="Continue"]');
        this.paymentInfoContinue = page.locator('#payment-info-buttons-container input[value="Continue"]');
        this.confirmOrderButton = page.locator('#confirm-order-buttons-container input[value="Confirm"]');

        // Order Confirmation
        this.orderSuccessMessage = page.locator('.order-completed .title');
        this.orderDetailsLink = page.getByRole('link', { name: 'Click here for order details.' });
        this.orderInformationHeading = page.getByRole('heading', { name: 'Order information' });
        this.orderNumberText = page.locator('.order-number');
    }

    async proceedAsGuest() {
        await this.checkoutAsGuestButton.click();
    }

    async fillBillingAddress({ firstName, lastName, email, country, city, address1, zipCode, phone }) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.country.selectOption({ label: country });
        await this.city.fill(city);
        await this.address1.fill(address1);
        await this.zipCode.fill(zipCode);
        await this.phone.fill(phone);
        await this.billingContinue.click();
    }

    async completeRemainingStepsAndConfirm() {
        await this.shippingAddressContinue.click();
        await this.shippingMethodContinue.click();
        await this.paymentMethodContinue.click();
        await this.paymentInfoContinue.click();
        await this.confirmOrderButton.click();
    }

    async openOrderDetails() {
        await this.orderDetailsLink.click();
    }
}