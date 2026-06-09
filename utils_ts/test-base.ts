import {test as baseTest} from '@playwright/test';
interface testData {
    username:string;
    password:string;
    productName: string;
};
export const customtest = baseTest.extend<{testBasedata:testData}>(
    {
        testBasedata : {
            "username" : "abhi6900@gmail.com",
            "password" : "Kolkata@1",
            "productName" : "ZARA COAT 3"
        }
    }
)