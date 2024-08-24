from page_objects.home_page import HomePage
from page_objects.login_page import LoginPage


def test_logout(page):
    loginPage = LoginPage(page)
    loginPage.navigate('https://saucedemo.com')
    loginPage.login('standard_user', 'secret_sauce')

    logout = HomePage(page)
    logout.logout()

    assert page.url == "https://www.saucedemo.com/"

