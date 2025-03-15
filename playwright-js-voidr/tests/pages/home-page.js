// homePage.js
const BasePage = require('./base-page');
const {
  cartBadge,
  addToCartButton,
  removeFromCartButton,
  sideMenuButton,
  logoutButton
} = require('../page-objects/home-page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
  }

  async addItemToCart() {
    await this._clickRandomButton(addToCartButton, 'No "Add to Cart" button was found.');
  }

  async removeItemFromCart() {
    await this._clickRandomButton(removeFromCartButton, 'No "Remove" button was found.');
  }

  async _clickRandomButton(selector, errorMessage) {
    const buttons = await this.page.$$(selector);
    if (buttons.length > 0) {
      const randomIndex = Math.floor(Math.random() * buttons.length);
      await buttons[randomIndex].click();
    } else {
      throw new Error(errorMessage);
    }
  }

  async goToCart() {
    await this.page.goto('https://www.saucedemo.com/cart.html');
  }

  async getCartCount() {
    return await this.page.textContent(cartBadge);
  }

  async logout() {
    await this.page.click(sideMenuButton);
    await this.page.click(logoutButton);
  }
}

module.exports = HomePage;
