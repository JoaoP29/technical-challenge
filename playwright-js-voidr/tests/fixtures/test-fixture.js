const base = require('@playwright/test');
const LoginPage = require('../pages/login-page');
const HomePage = require('../pages/home-page');
const CartPage = require('../pages/cart-page');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  authenticatedPage: async ({ page, loginPage }, use) => {
    await loginPage.navigate('https://saucedemo.com');
    await loginPage.doLogin('standard_user', 'secret_sauce');
    await use(page);
  }
});

exports.expect = base.expect; 