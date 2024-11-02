// homePage.js
const BasePage = require('./base-page'); // Certifique-se de que o caminho está correto

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.cartBadge = 'span[class="shopping_cart_badge"]';
  }

  async addItemToCart() {
    await this._clickRandomButton('button[id^="add-to-cart-"]', 'No "Add to Cart" button was found.');
  }

  async removeItemFromCart() {
    await this._clickRandomButton('button[id^="remove-"]', 'No "Remove" button was found.');
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
    return await this.page.textContent(this.cartBadge);
  }

  async logout() {
    await this.page.click('button[id="react-burger-menu-btn"]');
    await this.page.click('a[id="logout_sidebar_link"]');
  }
}

module.exports = HomePage;
