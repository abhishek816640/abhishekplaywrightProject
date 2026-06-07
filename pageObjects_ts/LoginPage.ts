import { expect, Locator, Page } from '@playwright/test';
export class LoginPage {
            signInButton: Locator;
            userName: Locator;
            passWord: Locator;
            page : Page
    constructor(page : Page) {
        this.page = page;
        this.signInButton = this.page.locator("[value='Login']");
        this.userName = this.page.locator("#userEmail");
        this.passWord = this.page.locator("#userPassword");

    }

    async gotoLogin() {
        this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(username:string, password:string) {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };