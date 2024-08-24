from page_objects.base_page import BasePage

class CartPage(BasePage):
    def __init__(self, page):
        super().__init__(page)
        self.firstNameField = 'input[name="firstName"]'
        self.lastNameField = 'input[name="lastName"]'
        self.postalCodeField = 'input[name="postalCode"]'
        self.continueButton = 'input[type="submit"]'
        self.finishButton = 'button[name="finish"]'
        self.thankYouMessage = 'h2'
        self.checkOutError = 'h3'

    def checkout(self):
        self.page.locator('button[id="checkout"]').click()

    def fillCheckOutInformation(self, firstName, lastName, postalCode):
        self.page.fill(self.firstNameField, firstName)
        self.page.fill(self.lastNameField, lastName)
        self.page.fill(self.postalCodeField, postalCode)
        self.page.click(self.continueButton)

    def getCheckOutErrorMessage(self):
        return self.page.text_content(self.checkOutError)

    def finishOrder(self):
        self.page.click(self.finishButton)

    def getThankYouMessage(self):
        return self.page.text_content(self.thankYouMessage)
