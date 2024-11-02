// loginPage.js
const BasePage = require('./base-page'); // Certifique-se de que o caminho está correto

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.usernameField = 'input[name="user-name"]';
    this.passwordField = 'input[name="password"]';
    this.loginButton = 'input[name="login-button"]';
    this.errorMessage = 'h3[data-test="error"]';
  }

  async login(username, password) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }
}

module.exports = LoginPage;
