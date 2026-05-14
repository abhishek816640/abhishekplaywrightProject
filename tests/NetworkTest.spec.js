import { test, expect } from '@playwright/test';


test('Security Test Expample', async ({ page }) => {
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const email = "abhi6900@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Kolkata@1");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    await page.locator("button[routerlink*='myorders']").click();
    //login and reach the order page
    //Intercept request(Change the request)
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69f05ca5f86ba51a658deaaa'})
    )
    await page.locator("button:has-text('View')").first().click()
    await page.pause();
})