// cartPage.js
const BasePage = require('./base-page'); // Certifique-se de que o caminho está correto

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameField = 'input[name="firstName"]';
    this.lastNameField = 'input[name="lastName"]';
    this.postalCodeField = 'input[name="postalCode"]';
    this.continueButton = 'input[type="submit"]';
    this.finishButton = 'button[name="finish"]';
    this.thankYouMessage = 'h2';
    this.checkOutError = 'h3';
  }

  async checkout() {
    await this.page.click('button[id="checkout"]');
  }

  async fillCheckOutInformation(firstName, lastName, postalCode) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.postalCodeField, postalCode);
    await this.page.click(this.continueButton);
  }

  async getCheckOutErrorMessage() {
    return await this.page.textContent(this.checkOutError);
  }

  async finishOrder() {
    await this.page.click(this.finishButton);
  }

  async getThankYouMessage() {
    return await this.page.textContent(this.thankYouMessage);
  }
}

module.exports = CartPage;