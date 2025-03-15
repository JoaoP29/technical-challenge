// loginPage.js
const BasePage = require('./base-page');
const {
  usernameField,
  passwordField,
  loginButton,
  errorMessage,
  standard_user,
  locked_out_user,
  problem_user,
  performance_glitch_user,
  password
} = require('../page-objects/login-page');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async doLoginStandardUser(username, password) {
    await this.page.fill(usernameField, username);
    await this.page.fill(passwordField, password);
    await this.page.click(loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(errorMessage);
  }
}

module.exports = LoginPage;
