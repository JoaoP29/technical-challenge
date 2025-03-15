// login.spec.js
const { test, expect } = require('./fixtures/test-fixture');
const LoginPage = require('./pages/login-page'); // Certifique-se de que o caminho está correto

test.describe('Login Functionality', () => {
  test('should block access to home page without login', async ({ loginPage }) => {
    // Arrange
    await loginPage.navigate('https://www.saucedemo.com/inventory.html');
    
    // Act
    const errorMessage = await loginPage.getErrorMessage();
    
    // Assert
    expect(errorMessage).not.toBeNull();
  });

  test('should allow access with valid credentials', async ({ page, loginPage }) => {
    // Arrange
    await loginPage.navigate('https://www.saucedemo.com');
    
    // Act
    await loginPage.doLoginStandardUser('standard_user', 'secret_sauce');
    
    // Assert
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  const invalidCredentials = [
    { scenario: 'invalid username', username: 'invalid_user', password: 'secret_sauce' },
    { scenario: 'invalid password', username: 'standard_user', password: 'invalid_pass' },
    { scenario: 'locked out user', username: 'locked_out_user', password: 'secret_sauce' },
  ];

  for (const { scenario, username, password } of invalidCredentials) {
    test(`should show error for ${scenario}`, async ({ loginPage }) => {
      // Arrange
      await loginPage.navigate('https://www.saucedemo.com');
      
      // Act
      await loginPage.doLoginStandardUser(username, password);
      
      // Assert
      const errorMessage = await loginPage.getErrorMessage();
      expect(errorMessage).not.toBeNull();
    });
  }
});
