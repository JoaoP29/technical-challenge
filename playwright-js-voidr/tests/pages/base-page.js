// basePage.js
class BasePage {
    constructor(page) {
      this.page = page;
    }
  
    async navigate(url) {
      return await this.page.goto(url);
    }
  }
  
  module.exports = BasePage;
  