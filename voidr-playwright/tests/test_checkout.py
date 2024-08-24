import re

from playwright.sync_api import expect
from page_objects.cart_page import CartPage
from page_objects.home_page import HomePage
from page_objects.login_page import LoginPage

def testCheckOut(page):
    loginPage = LoginPage(page)
    loginPage.navigate('https://saucedemo.com')
    loginPage.login("standard_user", "secret_sauce")

    homePage = HomePage(page)
    homePage.addItemToCart()
    homePage.goToCart()

    cartPage = CartPage(page)
    cartPage.checkout()
    cartPage.fillCheckOutInformation("João", "Silva", "123")

    expect(cartPage.page).to_have_url('https://www.saucedemo.com/checkout-step-two.html')

    cartPage.finishOrder()

    assert cartPage.getThankYouMessage() == 'Thank you for your order!'
    
def testFinishOrderWithoutMandatoryFieldsFilled(page):
    loginPage = LoginPage(page)
    loginPage.navigate('https://saucedemo.com')
    loginPage.login("standard_user", "secret_sauce")

    homePage = HomePage(page)
    homePage.addItemToCart()
    homePage.goToCart()

    cartPage = CartPage(page)
    cartPage.checkout()
    cartPage.fillCheckOutInformation(" ", "", "123")

    assert re.search(r'Error:.*', cartPage.getCheckOutErrorMessage(), re.IGNORECASE)

def testCheckOutNoOrder(page): # This test is planned to fail
    loginPage = LoginPage(page)
    loginPage.navigate('https://saucedemo.com')
    loginPage.login("standard_user", "secret_sauce")

    homePage = HomePage(page)
    homePage.goToCart()

    # No items added to the cart

    cartPage = CartPage(page)
    checkoutButton = cartPage.page.locator('button[id="checkout"]')

    try:
        expect(checkoutButton).not_to_be_enabled()
        print("Success!  The checkout button isn't enabled when the cart's empty")
    except AssertionError:
        raise AssertionError(
            "Fail! The checkout button should be disabled when the cart's empty. It remains enabled, though.")