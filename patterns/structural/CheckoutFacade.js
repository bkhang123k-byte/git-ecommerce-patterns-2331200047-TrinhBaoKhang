import { InventoryService } from '../../services/InventoryService.js';
import { PaymentService } from '../../services/PaymentService.js';
import { ShippingService } from '../../services/ShippingService.js';

class CheckoutFacade {
    constructor() {
        this.inventoryService = new InventoryService();
        this.paymentService = new PaymentService();
        this.shippingService = new ShippingService();
    }

    placeOrder(orderDetails) {
        // TODO: Implement the Facade method.
        // This method should orchestrate the calls to the subsystem services
        // in the correct order to simplify the checkout process.
        // 1. Check if all products are in stock using `inventoryService.checkStock()`.
        // 2. If they are, process the payment using `paymentService.processPayment()`.
        // 3. If payment is successful, arrange shipping using `shippingService.arrangeShipping()`.
        // 4. Log the result of each step. If a step fails, log it and stop.

        const inStock = this.inventoryService.checkStock(orderDetails.productIds);
        if(inStock){
            const payment = this.paymentService.processPayment(orderDetails.userID, 35);
            if(payment){
                const shipping = this.shippingService.arrangeShipping(orderDetails.userID, orderDetails.shippingInfo);
                if(!shipping){
                    console.log( "Fail delivering!!!");
                }
            }
            else{
                console.log ("Fail to pay for your goods!!!!");
            }
        }else{
            console.log("There're not enough supplies for your order!!")
        }
        
    }
}

export { CheckoutFacade };
