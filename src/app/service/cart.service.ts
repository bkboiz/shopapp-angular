import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { BehaviorSubject } from "rxjs";
import { ProductDetailResponse } from "../dtos/response/detail.product.response";

@Injectable({
    providedIn: 'root'
})
export class CartService {

    private cartItemCount = new BehaviorSubject<number>(0);
    cartItemCount$ = this.cartItemCount.asObservable();

    productIdBuyNow!: number;

    private selectedProducts: { productDetail: ProductDetailResponse, quantity: number; }[] = [];

    private cart: Map<number, number> = new Map();
    constructor(private productService: ProductService) {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = new Map(JSON.parse(storedCart));
        }
    }

    addToCart(productId: number, quantity: number) {
        console.log(productId, quantity);
        if (this.cart.has(productId)) {
            this.cart.set(productId, this.cart.get(productId)! + quantity);
        } else {
            this.cart.set(productId, quantity);
        }
        this.cartItemCount.next(quantity);
        this.saveCartToLocalStorage();
    }

    setSelectedProducts(selectedProducts: { productDetail: ProductDetailResponse, quantity: number; }[]) {
        this.selectedProducts = selectedProducts;
        console.log('selected product: ', this.selectedProducts);
    }

    getSelectedProducts(): any[] {
        return this.selectedProducts;
    }


    saveCartToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
    }

    getCart(): Map<number, number> {
        return this.cart;
    }

    updateCartItemCount(): void {
        let count = 0;
        this.cart.forEach(quantity => count += quantity);
        this.cartItemCount.next(count);
    }

    getCartItemCnt(): number {
        let count = 0;
        this.cart.forEach(quantity => count += quantity);
        return count;
    }

    setProductBuyNow(productId: number) {
        this.productIdBuyNow = productId;
    }

    getProductBuyNow() {
        return this.productIdBuyNow;
    }
}