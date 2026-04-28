import { test, expect } from '@playwright/test';

test('Calender Validation', async ({ page }) => {
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