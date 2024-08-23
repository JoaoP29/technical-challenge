import pytest

from page_objects.login_page import LoginPage
from page_objects.home_page import HomePage

def testValidLogin(page):
    loginPage = LoginPage(page)
    loginPage.navigate("https://www.saucedemo.com/")
    loginPage.login("standard_user", "secret_sauce")

    homePage = HomePage(page)
    assert page.url == "https://www.saucedemo.com/inventory.html"

@pytest.mark.parametrize("username, password", [
    ("invalid_user", "secret_sauce"),
    ("standard_user", "invalid_pass"),
])

def test_invalid_login(page, username, password):
    loginPage = LoginPage(page)
    loginPage.navigate("https://www.saucedemo.com/")
    loginPage.login(username, password)

    assert loginPage.get_error_message() is not None