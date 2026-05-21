const { test, expect ,request} = require('@playwright/test');
const {LoginPage} = require('../pageObjects/LoginPage');
const {DashBoardPage} = require('../pageObjects/DashBoardPage');


test.only('Client App Login', async ({ browser, page }) => {
    const productName = "ZARA COAT 3";
    const userName = "abhi6900@gmail.com";
    const password = "Kolkata@1";
    const loginPage  = new LoginPage(page);
    const dashBoardPage  = new DashBoardPage(page);
    await loginPage.gotoLogin();
    await loginPage.validLogin(userName,password);
    await dashBoardPage.searchProduct(productName);
    await dashBoardPage.navigateToCartPage();
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