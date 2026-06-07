import { LoginPage } from './LoginPage';
import { DashBoardPage } from './DashBoardPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';
import { OrdersReviewPage } from './OrdersReviewPage';
import { CartPage } from './CartPage';
import { expect, type Locator, type Page } from '@playwright/test';

export class POManager {
    loginPage : LoginPage;
    dashBoardPage : DashBoardPage;
    ordersHistoryPage : OrdersHistoryPage;
    ordersReviewPage : OrdersReviewPage;
    cartPage : CartPage;
    page : Page;
    constructor(page:any,productName:string) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page,productName);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.cartPage = new CartPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getdashBoardPage() {
        return this.dashBoardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }

    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }

    getDashboardPage()
    {
        return this.dashBoardPage;
    }
}
module.exports = {POManager};

