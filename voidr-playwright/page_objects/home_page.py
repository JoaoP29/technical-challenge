import random

from page_objects.base_page import BasePage

class HomePage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.cart_badge = 'span[class="shopping_cart_badge"]'

    def addItemToCart(self):
        addToCartButtons = self.page.query_selector_all('button[id^="add-to-cart-"]')

        if addToCartButtons:
            randomButton = random.choice(addToCartButtons)
            randomButton.click()
        else:
            raise Exception('No "Add to Cart" button was found.')

    def removeItemFromCart(self):
        removeFromCartButtons = self.page.query_selector_all('button[id^="remove-"]')

        if removeFromCartButtons:
            randomButton = random.choice(removeFromCartButtons)
            randomButton.click()
        else:
            raise Exception('No "Remove" button was found')
    def goToCart(self):
        self.page.goto('https://www.saucedemo.com/cart.html')

    def getCartCount(self):
        return self.page.text_content(self.cart_badge)

    def logout(self):
        self.page.click('button[id="react-burger-menu-btn"]')
        self.page.click('a[id="logout_sidebar_link"]')