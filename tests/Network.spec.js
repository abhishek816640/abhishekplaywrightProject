const { test, expect, request } = require('@playwright/test');
const { ApiUtils } = require('../utils/ApiUtils');
const loginPayLoad = { userEmail: "abhi6900@gmail.com", userPassword: "Kolkata@1" };
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }
let response;
const fakePayLoadOrders = { data: [], message: "No Orders" };
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
})

test('@Api API Validations', async ({ page }) => {

    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client");
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69d60390f86ba51a65519699",
        route=>{
            //intercepting the response--we would modify the response and by response UI would render the page
            const response = page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoadOrders);
            route.fulfill({
                response,body,
            });
        }
    );
    await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
 
  console.log(await page.locator(".mt-4").textContent());
})