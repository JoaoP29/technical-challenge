// logout.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('./page-objects/login-page'); // Certifique-se de que o caminho está correto
const HomePage = require('./page-objects/home-page'); // Certifique-se de que o caminho está correto

test('Logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://saucedemo.com');
  await loginPage.login('standard_user', 'secret_sauce');

  const homePage = new HomePage(page);
  await homePage.logout();

  await expect(page).toHaveURL('https://www.saucedemo.com/'); // Verifica se a URL corresponde após logout
});
