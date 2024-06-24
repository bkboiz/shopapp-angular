import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../dtos/response/product.response";
import { GetProductResponse } from "../dtos/response/get.product.response";
import { ProductDetailResponse } from "../dtos/response/detail.product.response";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = 'http://localhost:8039/api/v1/product';

    constructor(private http: HttpClient) { };

    getProducts(page: number, limit: number, categoryId: number, keyword: string): Observable<GetProductResponse> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString())
            .set('categoryId', categoryId.toString())
            .set('keyword', keyword);

        return this.http.get<GetProductResponse>(this.apiGetProducts, { params });

    }

    getProductById(productId: number): Observable<ProductDetailResponse> {
        return this.http.get<ProductDetailResponse>(`${this.apiGetProducts}/${productId}`);
    }

}