const {test,expect} = require('@playwright/test');

test('popUp Validations',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com/");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#alertbtn").click();
    page.on('dialog', dialog => dialog.accept());
    const frameLocator = page.frameLocator("#courses-iframe");
    frameLocator.locator().click();

})

test.only('Screenshot and Visual Comparison', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path : 'screenshotPage.png'})
    await page.locator("#hide-textbox").click();
    await page.screenshot({path : 'screenshot.png'})
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#alertbtn").click();
    page.on('dialog', dialog => dialog.accept());
})