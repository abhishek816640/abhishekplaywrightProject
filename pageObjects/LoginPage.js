class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = this.page.locator("[value='Login']");
        this.userName = this.page.locator("#userEmail");
        this.passWord = this.page.locator("#userPassword");

    }

    async gotoLogin() {
        this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = { LoginPage };