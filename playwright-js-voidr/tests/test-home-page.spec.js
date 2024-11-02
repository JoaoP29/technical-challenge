// home.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('./page-objects/login-page'); // Certifique-se de que o caminho está correto
const HomePage = require('./page-objects/home-page'); // Certifique-se de que o caminho está correto

test('Add to Cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://saucedemo.com');
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);
  await homePage.addItemToCart();

  const cartCount = await homePage.getCartCount();
  expect(cartCount).toBe("1"); // Verifica se o carrinho contém 1 item
});

test('Remove from Cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://saucedemo.com');
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);
  await homePage.addItemToCart();
  await homePage.removeItemFromCart();

  const cartBadgeVisible = await homePage.page.locator(homePage.cartBadge).isVisible();
  expect(cartBadgeVisible).toBeFalsy(); // Verifica se o ícone do carrinho desapareceu após a remoção
});
