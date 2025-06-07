export class LoginPage{
  constructor(page) {
    this.page = page;
  }
  
  async login(email, password) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
    await this.page.locator('[data-qa="login-button"]').click();
  }
}