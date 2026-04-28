const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('./utils/ApiUtils');
const loginPayLoad = { userEmail: "abhi6900@gmail.com", userPassword: "Kolkata@1" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
})

test('Web API Validations', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    const productName = "ZARA COAT 3";
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    console.log("The order id is " + response.orderId);
})