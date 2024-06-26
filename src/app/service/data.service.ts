import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class DataService {

    userId!: number;
    productId!: number;
    quantity!: number;

    setOrderInfo(productId: number, quantity: number) {
        this.productId = productId;
        this.quantity = quantity;
    }

    getUserId(): number {
        return this.userId;
    }

    getProductId(): number {
        return this.productId;
    }

    getQuantity(): number {
        return this.quantity;
    }
}