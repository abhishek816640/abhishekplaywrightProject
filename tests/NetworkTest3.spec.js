import { test, expect } from '@playwright/test';


test('Security Test Expample3', async ({ page }) => {
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "abhi6900@gmail.com";
    await page.on('request', request => console.log(request.url()));
    await page.on('response', response => console.log(response.url(),response.status()));
    await page.route('**/*.{css,jpg,png,jpeg}',
        route => route.abort()
    )
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Kolkata@1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    await page.locator("button[routerlink*='myorders']").click();
    //login and reach the order page
    //Abort Network calls

    await page.locator("button:has-text('View')").first().click()
    await page.pause();
})