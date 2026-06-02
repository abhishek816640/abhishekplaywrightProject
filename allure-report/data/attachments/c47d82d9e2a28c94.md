# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPO.spec.js >> Client Po Login ADIDAS ORIGINAL
- Location: tests\ClientAppPO.spec.js:8:4

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 40000ms exceeded.
Call log:
  - waiting for locator('.cart li') to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | class DashBoardPage {
  2  |     constructor(page, productName) {
  3  |         this.page = page
  4  |         this.products = this.page.locator(".card-body");
  5  |         this.productText = this.page.locator(".card-body b");
  6  |         this.cart = this.page.locator("[routerlink*='cart']");
  7  |         this.productName = this.page.locator("h5:has-text('" + productName + "')");
  8  |         this.orders = page.locator("button[routerlink*='myorders']");
  9  |     }
  10 | 
  11 |     async searchProduct(productName) {
  12 |         const titles = await this.productText.allTextContents();
  13 |         console.log(titles);
  14 |         const count = await this.products.count();
  15 |         console.log(count);
  16 |         for (let i = 0; i < count; ++i) {
  17 |             console.log(await this.productName.textContent());
  18 |             if (await this.products.nth(i).locator("b").textContent() === productName) {
  19 |                 console.log("ZARA COAT 3 is found");
  20 |                 await this.products.nth(i).getByRole('button', { name: 'Add To cart' }).click();
  21 |                 break;
  22 |             }
  23 |         }
  24 |     }
  25 |     async navigateToCartPage() {
  26 |         await this.cart.click();
> 27 |         await (this.page.locator(".cart li")).waitFor();
     |                                               ^ Error: locator.waitFor: Test timeout of 40000ms exceeded.
  28 |         const bool = await this.productName.isVisible(1);
  29 |     }
  30 | 
  31 |     async navigateToOrders() {
  32 |         await this.orders.click();
  33 |     }
  34 | }
  35 | module.exports = { DashBoardPage };
```