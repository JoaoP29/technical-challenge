from random import random

from playwright.sync_api import Page, expect, sync_playwright
from page_objects.base_page import BasePage

class LoginPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.usernameField = self.page.get_by_placeholder('Username')
        self.passwordField = self.page.get_by_placeholder('Password')
        self.loginButton = self.page.get_by_role('button', name='Login')
        self.errorMessage = self.page.get_by_test_id('error')

    def login(self, username, password):
        self.page.fill(self.usernameField, username)
        self.page.fill(self.passwordField, password)
        self.page.click(self.loginButton)

    def getErrorMessage(self):
        return self.page.text_content(self.errorMessage)