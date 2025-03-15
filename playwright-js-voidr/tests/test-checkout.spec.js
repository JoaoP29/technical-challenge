// checkout.spec.js
const { test, expect } = require('./fixtures/test-fixture');
const LoginPage = require('./pages/login-page'); // Certifique-se de que o caminho está correto
const HomePage = require('./pages/home-page'); // Certifique-se de que o caminho está correto
const CartPage = require('./pages/cart-page'); // Certifique-se de que o caminho está correto

test.describe('Checkout Process', () => {
  test('should complete checkout successfully', async ({ authenticatedPage, homePage, cartPage }) => {
    // Arrange - authentication handled by fixture
    await homePage.addItemToCart();
    await homePage.goToCart();
    
    // Act
    await cartPage.checkout();
    await cartPage.fillCheckOutInformation("João", "Silva", "123");
    await cartPage.finishOrder();
    
    // Assert
    const thankYouMessage = await cartPage.getThankYouMessage();
    expect(thankYouMessage).toBe('Thank you for your order!');
  });

  test('should show error when mandatory fields are missing', async ({ authenticatedPage, homePage, cartPage }) => {
    // Arrange - authentication handled by fixture
    await homePage.addItemToCart();
    await homePage.goToCart();
    
    // Act
    await cartPage.checkout();
    await cartPage.fillCheckOutInformation("", " ", "123");
    
    // Assert
    const errorMessage = await cartPage.getCheckOutErrorMessage();
    expect(errorMessage).toMatch(/Error:.*/i);
  });

  test('should disable checkout button for empty cart', async ({ authenticatedPage, homePage, cartPage }) => {
    // Arrange - authentication handled by fixture
    await homePage.goToCart();
    
    // Act & Assert
    const checkoutButton = cartPage.page.locator('button[id="checkout"]');
    await expect(checkoutButton).toBeDisabled();
  });
});