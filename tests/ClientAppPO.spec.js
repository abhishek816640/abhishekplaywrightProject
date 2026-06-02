const {test,expect} = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashBoardPage } = require('../pageObjects/DashBoardPage');
const { POManager } = require('../pageObjects/POManager')
const dataSet = JSON.parse(JSON.stringify(require("../utils/PlaceOrder")));
for(const data of dataSet)
{
   test(`Client Po Login ${data.productName}`, async ({page}) => {
   //js file- Login js, DashboardPage
   const username = data.username;
   const password = data.password;
   const productName = data.productName;
   const poManager = new POManager(page,productName);
   const products = page.locator(".card-body");
   const loginPage = poManager.getLoginPage();
   await loginPage.gotoLogin();
   await loginPage.validLogin(username, password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProduct(productName);
   await dashboardPage.navigateToCartPage();

   const cartPage = poManager.getCartPage();
   await cartPage.VerifyProductIsDisplayed(productName);
   await cartPage.Checkout();

   const ordersReviewPage = poManager.getOrdersReviewPage();
   await ordersReviewPage.searchCountryAndSelect("ind", "India");
   const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
   });

  
}

test(`@web Calender ValidationPO`, async ({ page }) => {
    const month = "11";
    const day = "30";
    const year = "2029";
    const expectedList = [month, day, year];
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__wrapper").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__tile").nth(Number(month) - 1).click();
    await page.locator("//abbr[@aria-label='November 30, 2029']").click();
    const inputs = page.locator('.react-date-picker__inputGroup__input')
    for (let i = 0; i < expectedList.length; i++) {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
    }
})

