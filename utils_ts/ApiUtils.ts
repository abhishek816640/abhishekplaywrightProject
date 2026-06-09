class ApiUtils {
    apiContext: any;
    loginPayLoad:string;
    constructor(apiContext:any,loginPayLoad:string) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }
    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.loginPayLoad })
       
        const loginResponseBody = await loginResponse.json();
        const token = loginResponseBody.token;
        console.log(token);
        return token;
    }
    async createOrder(orderPayload:string) {
        let response = {token:String,orderId:String};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            }
        )
        let orderId:any;
        const orderResponseJson = await orderResponse.json();
        orderId = orderResponseJson.orders[0];
        const productOrderId = orderResponseJson.productOrderId[0];
        const message = orderResponseJson.message;
        console.log(orderId);
        console.log(productOrderId);
        console.log(message);
        
        response.orderId = orderId;
        return response;
    }
    
}
module.exports = {ApiUtils};