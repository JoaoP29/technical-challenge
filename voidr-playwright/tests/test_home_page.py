from page_objects.login_page import LoginPage
from page_objects.home_page import HomePage


def testAddToCart(page):
    loginPage = LoginPage(page)
    loginPage.navigate('https://saucedemo.com')
    loginPage.login("standard_user", "secret_sauce")

    homePage = HomePage(page)
    homePage.addItemToCart()

    assert homePage.getCartCount() == "1"

def testRemoveFromCart(page):
    loginPage = LoginPage(page)
    loginPage.navigate('https://saucedemo.com')
    loginPage.login("standard_user", "secret_sauce")

    homePage = HomePage(page)
    homePage.addItemToCart()
    homePage.removeItemFromCart()

    assert not homePage.page.locator(homePage.cart_badge).is_visible()