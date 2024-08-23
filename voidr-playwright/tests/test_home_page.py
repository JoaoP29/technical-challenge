import pytest
from page_objects.login_page import LoginPage
from page_objects.home_page import HomePage


def test_add_to_cart(page):
    loginPage = LoginPage(page)
    loginPage.navigate("https://www.saucedemo.com/")
    loginPage.login("standard_user", "secret_sauce")

    homePage = HomePage(page)
    homePage.addItemToCart()

    assert homePage.get_cart_count() == "1"

def test_remove_from_cart(page):
    loginPage = LoginPage(page)
    loginPage.navigate("https://www.saucedemo.com/")
    loginPage.login("standard_user", "secret_sauce")

    homePage = HomePage(page)
    homePage.addItemToCart()
    homePage.removeItemFromCart()

    assert not homePage.page.locator(homePage.cart_badge).is_visible()