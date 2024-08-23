from pydoc import classname
import random
from zoneinfo import available_timezones

from page_objects.base_page import BasePage

class HomePage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.cart_badge = 'span[class="shopping_cart_badge"]'

    def addItemToCart(self):
        add_to_cart_buttons = self.page.query_selector_all('button[id^="add-to-cart-"]')

        if add_to_cart_buttons:
            random_button = random.choice(add_to_cart_buttons)
            random_button.click()
        else:
            raise Exception('Nenhum botão "Add to Cart" foi encontrado na página.')

    def removeItemFromCart(self):
        removeFromCartButtons = self.page.query_selector_all('button[id^="remove-"]')

        if removeFromCartButtons:
            random_button = random.choice(removeFromCartButtons)
            random_button.click()
        else:
            raise Exception('Nenhum botão "Remove" foi encontrado na página.')

    def sortItemsByName(self):
        # filterButton = self.page.get_by_role('select', classname('product_sort_container'))
        sortAToZ = self.page.get_by_role('option', name='Name A to Z')
        sortZToA = self.page.get_by_role('option', name='Name Z to A')

        filterButton.click()
        sortAToZ.click()
        sortZToA.click()

    def sortItemsByPrice(self):
        filterButton = self.page.get_by_role('select', classname('product_sort_container'))
        sortLowToHigh = self.page.get_by_role('button', name='Sort by price (low to high)')
        sortHighToLow = self.page.get_by_role('button', name='Sort by price (high to low)')

        filterButton.click()
        sortLowToHigh.click()
        sortHighToLow.click()

    def goToCart(self):
        cartButton = self.page.get_by_test_id('shopping-cart-link')

        cartButton.click()

    def get_cart_count(self):
        return self.page.text_content(self.cart_badge)