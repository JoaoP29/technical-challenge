// checkout.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('./page-objects/login-page'); // Certifique-se de que o caminho está correto
const HomePage = require('./page-objects/home-page'); // Certifique-se de que o caminho está correto
const CartPage = require('./page-objects/cart-page'); // Certifique-se de que o caminho está correto

test('Successful Checkout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://saucedemo.com');
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);
  await homePage.addItemToCart();
  await homePage.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.checkout();
  await cartPage.fillCheckOutInformation("João", "Silva", "123");

  await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

  await cartPage.finishOrder();

  const thankYouMessage = await cartPage.getThankYouMessage();
  expect(thankYouMessage).toBe('Thank you for your order!'); // Verifica a mensagem de agradecimento ao finalizar o pedido
});

test('Finish Order Without Mandatory Fields Filled', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://saucedemo.com');
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);
  await homePage.addItemToCart();
  await homePage.goToCart();

  const cartPage = new CartPage(page);
  await cartPage.checkout();
  await cartPage.fillCheckOutInformation("", " ", "123"); // Campos obrigatórios faltando

  const errorMessage = await cartPage.getCheckOutErrorMessage();
  expect(errorMessage).toMatch(/Error:.*/i); // Verifica se há uma mensagem de erro ao não preencher campos obrigatórios
});

test('Checkout Button Disabled When Cart is Empty', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://saucedemo.com');
  await loginPage.login("standard_user", "secret_sauce");

  const homePage = new HomePage(page);
  await homePage.goToCart(); // Nenhum item adicionado ao carrinho

  const cartPage = new CartPage(page);
  const checkoutButton = cartPage.page.locator('button[id="checkout"]');

  try {
    await expect(checkoutButton).toBeDisabled(); // Verifica se o botão de checkout está desativado quando o carrinho está vazio
    console.log("Success! The checkout button isn't enabled when the cart's empty");
  } catch (error) {
    throw new Error("Fail! The checkout button should be disabled when the cart's empty. It remains enabled, though.");
  }
});