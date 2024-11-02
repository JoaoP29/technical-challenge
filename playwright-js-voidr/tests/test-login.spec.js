// login.spec.js
const { test, expect } = require('@playwright/test');
const LoginPage = require('./page-objects/login-page'); // Certifique-se de que o caminho está correto

test('Go to Home Page Without Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://www.saucedemo.com/inventory.html');
  
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage).not.toBeNull(); // Verifica se há uma mensagem de erro ao tentar acessar a página sem login
});

test('Valid Login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate('https://www.saucedemo.com');
  await loginPage.login('standard_user', 'secret_sauce');
  
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Verifica se a URL corresponde após login válido
});

test.describe('Invalid Login Scenarios', () => {
  const invalidCredentials = [
    { username: 'invalid_user', password: 'secret_sauce' },
    { username: 'standard_user', password: 'invalid_pass' },
    { username: 'locked_out_user', password: 'secret_sauce' },
  ];

  for (const creds of invalidCredentials) {
    test(`Invalid Login with ${creds.username}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.navigate('https://www.saucedemo.com');
      await loginPage.login(creds.username, creds.password);
      
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).not.toBeNull(); // Verifica se uma mensagem de erro é exibida para cada combinação inválida
    });
  }
});
