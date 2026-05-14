const { test, expect ,request} = require('@playwright/test');
let webcontext;
test.beforeAll(async({ browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("abhi6900@gmail.com");
    await page.locator("#userPassword").fill("Kolkata@1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path : 'state.json'});
    webcontext = await browser.newContext({storageState:'state.json'});
})
test.only('Client App Login', async ({}) => {
    const page = await webcontext.newPage();
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "abhi6900@gmail.com";
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    console.log(count);
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            console.log("ZARA COAT 3 is found");
            await products.nth(i).locator('button:has-text("Add To Cart")').click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await (page.locator(".cart li")).waitFor();
    const bool = await page.locator(`h3:has-text("ZARA COAT 3")`).isVisible(1);
    await page.locator("button:has-text('Checkout')").click();
    await page.locator("[placeholder*='Country']").pressSequentially("Ind", { delay: 100 });
    const dropDown = page.locator(".ta-results");
    await dropDown.waitFor();
    const optionCount = await dropDown.locator("[type = 'button']").count();
    for (let i = 0; i < optionCount; ++i) {
        const text =  await dropDown.locator("[type = 'button']").nth(i).locator("span.ng-star-inserted > i.fa").textContent();
        if (text.trim() === "India") {
            await dropDown.locator("button").nth(i).click();
            break;
        }
    }
    await page.pause();
});