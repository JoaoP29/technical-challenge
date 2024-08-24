import pytest

from page_objects.login_page import LoginPage

def testGoToHomePageWithoutLogin(page):
    loginPage = LoginPage(page)
    loginPage.navigate("https://www.saucedemo.com/inventory.html")

    assert loginPage.getErrorMessage() is not None

@pytest.mark.parametrize("username, password", [
    ("standard_user", "secret_sauce"),
])
def testValidLogin(page, username, password):
    loginPage = LoginPage(page)
    loginPage.navigate('https://www.saucedemo.com')
    loginPage.login(username, password)

    assert page.url == "https://www.saucedemo.com/inventory.html"

@pytest.mark.parametrize("username, password", [
    ("invalid_user", "secret_sauce"),
    ("standard_user", "invalid_pass"),
    ("locked_out_user", "secret_sauce"),
])
def testInvalidLogin(page, username, password):
    loginPage = LoginPage(page)
    loginPage.navigate('https://www.saucedemo.com')
    loginPage.login(username, password)

    assert loginPage.getErrorMessage() is not None