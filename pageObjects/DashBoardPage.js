class DashBoardPage {
    constructor(page) {
        this.page = page
        this.products = this.page.locator(".card-body");
        this.productText = this.page.locator(".card-body b");
        this.cart = this.page.locator("[routerlink*='cart']");
        this.productName = this.page.locator(`h3:has-text("ZARA COAT 3")`);
    }

    async searchProduct(productName) {
        const titles = await this.productText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        console.log(count);
        for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                console.log("ZARA COAT 3 is found");
                await this.products.nth(i).locator('button:has-text("Add To Cart")').click();
                break;
            }
        }
    }
    async navigateToCartPage() {
        await this.cart.click();
        await (this.page.locator(".cart li")).waitFor();
        const bool = await this.productName.isVisible(1);
    }
}
module.exports = {DashBoardPage};