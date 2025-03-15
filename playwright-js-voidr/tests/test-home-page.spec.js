// home.spec.js
const { test, expect } = require('./fixtures/test-fixture');
const LoginPage = require('./pages/login-page'); // Certifique-se de que o caminho está correto
const HomePage = require('./pages/home-page'); // Certifique-se de que o caminho está correto

test.describe('Shopping Cart Management', () => {
  test('should increment cart count when adding item', async ({ authenticatedPage, homePage }) => {
    // Arrange - authentication handled by fixture
    
    // Act
    await homePage.addItemToCart();
    
    // Assert
    const cartCount = await homePage.getCartCount();
    expect(cartCount).toBe("1");
  });

  test('should remove cart badge when removing item', async ({ authenticatedPage, homePage }) => {
    // Arrange - authentication handled by fixture
    await homePage.addItemToCart();
    
    // Act
    await homePage.removeItemFromCart();
    
    // Assert
    const cartBadgeVisible = await homePage.page.locator('span[class="shopping_cart_badge"]').isVisible();
    expect(cartBadgeVisible).toBeFalsy();
  });
});
