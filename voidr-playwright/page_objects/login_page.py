
from page_objects.base_page import BasePage

class LoginPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.usernameField = 'input[name="user-name"]'
        self.passwordField = 'input[name="password"]'
        self.loginButton = 'input[name="login-button"]'
        self.errorMessage = 'h3[data-test="error"]'

    def navigate(self, url: str):
        self.page.goto(url)

    def login(self, username: str, password: str):
        self.page.fill(self.usernameField, username)
        self.page.fill(self.passwordField, password)
        self.page.click(self.loginButton)

    def getErrorMessage(self):
        return self.page.text_content(self.errorMessage)