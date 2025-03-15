// cartPage.js
const BasePage = require('./base-page');
const {
  firstNameField,
  lastNameField,
  postalCodeField,
  continueButton,
  finishButton,
  thankYouMessage,
  checkOutError,
  checkOutButton
} = require('../page-objects/cart-pages');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async checkout() {
    await this.page.click(checkOutButton);
  }

  async fillCheckOutInformation(firstName, lastName, postalCode) {
    await this.page.fill(firstNameField, firstName);
    await this.page.fill(lastNameField, lastName);
    await this.page.fill(postalCodeField, postalCode);
    await this.page.click(continueButton);
  }

  async getCheckOutErrorMessage() {
    return await this.page.textContent(checkOutError);
  }

  async finishOrder() {
    await this.page.click(finishButton);
  }

  async getThankYouMessage() {
    return await this.page.textContent(thankYouMessage);
  }
}

module.exports = CartPage;