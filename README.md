# Automated Testing with Playwright
## Overview
This repository contains an automated test suite using Playwright for the Sauce Demo website. The suite includes end-to-end tests for login, shopping cart management, and checkout processes, with cross-browser and mobile testing capabilities.

## Features
- Page Object Model (POM) architecture
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile browser testing (Pixel 5, iPhone 13)
- Parallel test execution
- Comprehensive test reporting
- Screenshot and video capture on failure
- Trace recording for debugging
- AAA (Arrange-Act-Assert) pattern implementation

## Project Structure
```
playwright-js-voidr/
├── tests/
│   ├── fixtures/
│   │   └── test-fixture.js    # Test fixtures and common setup
│   ├── page-objects/          # Selectors and element definitions
│   │   ├── cart-pages.js
│   │   ├── home-page.js
│   │   └── login-page.js
│   ├── pages/                 # Page actions and behaviors
│   │   ├── base-page.js
│   │   ├── cart-page.js
│   │   ├── home-page.js
│   │   └── login-page.js
│   └── specs/                 # Test specifications
│       ├── test-checkout.spec.js
│       ├── test-home-page.spec.js
│       └── test-login.spec.js
├── playwright.config.js       # Playwright configuration
└── package.json              # Project dependencies
```

## Test Categories

### Login Tests
- Access restriction for unauthenticated users
- Successful login with valid credentials
- Various invalid login scenarios

### Shopping Cart Tests
- Adding items to cart
- Removing items from cart
- Cart badge visibility and count

### Checkout Tests
- Complete checkout process
- Form validation
- Empty cart handling (with documented expected failure)

## Setup and Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-js-voidr
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests in all configured browsers:
```bash
npx playwright test
```

### Run tests in a specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
npx playwright test --project=mobile-chrome
npx playwright test --project=mobile-safari
```

### Run tests with UI mode:
```bash
npx playwright test --ui
```

### View test report:
```bash
npx playwright show-report
```
If port 9323 is in use, try:
```bash
npx playwright show-report --port 9324
```

## Debugging

### Run tests in debug mode:
```bash
npx playwright test --debug
```

### View traces for failed tests:
```bash
npx playwright show-trace
```

### Additional Options
- `--headed`: Run tests in headed mode
- `--workers=1`: Run tests sequentially
- `--retries=3`: Retry failed tests up to 3 times

## Test Reports
The test suite generates comprehensive reports including:
- HTML report with test results
- Screenshots of failures
- Video recordings of failed tests
- Trace files for debugging

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
