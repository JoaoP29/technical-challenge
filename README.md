# Automated Testing with Playwright
## Overview
This repository contains an automated test suite using Playwright for the Sauce Demo website. The suite includes tests for login, adding and removing items from the cart, checkout, and logout.

## Project Structure
The project follows a page object model architecture to maintain a separation of concerns and make the tests more readable and easier to maintain.

### Page Objects
- base_page.py: Contains the BasePage class, which is inherited by all other pages to provide common functionalities like navigation.
- cart_page.py: Implements interactions with the checkout page, including filling out checkout information and completing the order.
- home_page.py: Handles interactions on the home page, such as adding and removing items from the cart and accessing the cart page.
- login_page.py: Manages login operations, such as filling in the username and password, and checking for error messages.

### Tests
The tests are organized into different files to facilitate maintenance and ensure that each set of features is tested separately.

#### Login Tests (test_login.py)
- testGoToHomePageWithoutLogin: Verifies that an unauthenticated user is properly redirected when trying to access the inventory page without logging in.
- testValidLogin: Tests if a user with valid credentials can successfully log in.
- testInvalidLogin: Checks if the system displays appropriate error messages for different combinations of invalid credentials.

#### Home Page Tests (test_home_page.py)
- testAddToCart: Tests adding a random item to the cart and verifies that the cart item count is correctly incremented.
- testRemoveFromCart: Adds an item to the cart and then removes it, verifying that the item count is properly adjusted.

#### Checkout Tests (test_checkout.py)
- testCheckOut: Tests the complete checkout flow, from adding items to the cart to completing the order, verifying that a thank you message is displayed.
- testFinishOrderWithoutMandatoryFieldsFilled: Verifies that the system returns an error message when mandatory checkout fields are not filled out correctly.
- testCheckOutNoOrder: A planned failure test that checks if the checkout button remains disabled when the cart is empty.

#### Logout Test (test_logout.py)
- test_logout: Tests if the logout is executed correctly and if the user is redirected to the login page.

## How to run
1. Fork project (optional);
2. Clone repository;
3. Install requirments:
   - Python 3.8+;
   - Playwright;
   - Pytest.
4. Run the tests:
   ```
   pytest tests/ --headed --slowmo <any number how much slowmo you want>
   ```
   The above command will run the tests in "headed" mode (with the browser visible) and with a delay between each interaction to make it easier to observe the application's behavior.
   
## Contributions
Contributions are welcome! Feel free to open issues and pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
