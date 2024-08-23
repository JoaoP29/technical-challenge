from pydoc import classname
from random import random

from page_objects.base_page import BasePage

class HomePage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.cart_badge = 'span[class="shopping_cart_badge"]'

    def addItemToCart(self):
        selectedItem = random.choice(self.page.get_by_role('button', name='Add to cart'))
        selectedItem.click()

    def removeItemFromCart(self):
        selectedItem = random.choice(self.page.get_by_role('button', name='Remove'))
        selectedItem.click()

    def sortItemsByName(self):
        filterButton = self.page.get_by_role('select', classname('product_sort_container'))
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
        cartButton = self.page.get_by_data_test_id('shopping-cart-link')

        cartButton.click()