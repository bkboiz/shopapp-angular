import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { BehaviorSubject, Observable } from "rxjs";
import { ProductDetailResponse } from "../dtos/response/detail.product.response";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartEndpoint = API_URL + "cart";

    private cartItemCount = new BehaviorSubject<number>(0);
    cartItemCount$ = this.cartItemCount.asObservable();

    productIdBuyNow!: number;

    private selectedProducts: { productDetail: ProductDetailResponse, quantity: number; }[] = [];

    private cart: Map<number, number> = new Map();
    constructor(private productService: ProductService, private http: HttpClient) {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            this.cart = new Map(JSON.parse(storedCart));
        }
    }

    private createHeader(): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    getCartByUserId(userId: number): Observable<any> {
        const params = new HttpParams()
            .set('userId', userId);
        return this.http.get<any>(this.cartEndpoint, { params });
    }

    addToCart(data: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(this.cartEndpoint, data,
            { headers: this.createHeader(), observe: 'response' });
    }

    updateCartCount(count: number) {
        this.cartItemCount.next(count);
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