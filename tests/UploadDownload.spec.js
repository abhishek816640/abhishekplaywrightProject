const ExcelJs = require('exceljs');
import {test,expect} from '@playwright/test';

async function WriteExcelTest(searchText, filename,change) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filename);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await ReadExcel(worksheet, searchText);
    const cellvalue = worksheet.getCell(output.row, output.coll+change.collumnNum);
    console.log("The current cell value is " + cellvalue);
    cellvalue.value = "Baguiati";
    workbook.xlsx.writeFile(filename);
}

async function ReadExcel(worksheet, searchText) {
    let output = { row: 1, coll: 1 };
    worksheet.eachRow((row, rownumber) => {
        row.eachCell((cell, collNumber) => {
            //console.log(cell.value);
            if (cell.value === searchText) {
                output.coll = collNumber;
                output.row = rownumber;
            }
        });
    });
    return output;
}
 test('Uplad Download validation',async ({page}) =>{
    const textSearch = "Mango";
    const updatedValue = 299;
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button',{name : 'Download'}).click();
    //WriteExcelTest(textSearch,350,{rowchange:0,collChange:0},"C:/Users/welcome/Downloads/download.xlsx");
    //await page.locator("#fileinput").click();
    //await page.locator("#fileinput").setInputFiles("C:/Users/welcome/Downloads/download.xlsx");
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has : page.getByText(textSearch)});
    const finalLoctor = desiredRow.locator('#cell-4-undefined');
    await expect(finalLoctor).toContainText(updatedValue.toString());
 }
);