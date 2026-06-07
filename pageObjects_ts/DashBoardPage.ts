import { expect, Locator, Page } from '@playwright/test';
export class DashBoardPage {
        
        cart: Locator;
        orders: Locator;
        productText: Locator;
        productName: Locator;
        products: Locator;
        page : Page
    constructor(page:Page, productName:string) {
        this.page = page
        this.products = this.page.locator(".card-body");
        this.productText = this.page.locator(".card-body b");
        this.cart = this.page.locator("[routerlink*='cart']");
        this.productName = this.page.locator("h5:has-text('" + productName + "')");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProduct(productName:string) {
        const titles = await this.productText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        console.log(count);
        for (let i = 0; i < count; ++i) {
            console.log(await this.productName.textContent());
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                console.log("ZARA COAT 3 is found");
                await this.products.nth(i).getByRole('button', { name: 'Add To cart' }).click();
                break;
            }
        }
    }
    async navigateToCartPage() {
        await this.cart.click();
        await (this.page.locator(".cart li")).waitFor();
        const bool = await this.productName.isVisible();
    }

    async navigateToOrders() {
        await this.orders.click();
    }
}
module.exports = { DashBoardPage };