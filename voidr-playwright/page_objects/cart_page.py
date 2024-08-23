from page_objects.base_page import BasePage


class CartPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.checkout_button = 'button[id="checkout"]'

    def checkout(self):
        self.page.click(self.checkout_button)