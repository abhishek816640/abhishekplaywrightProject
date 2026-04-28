class ApiUtils {
    constructor(apiContext,loginPayLoad) {
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
    async createOrder(orderPayload) {
        let response = {};
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
        
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
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