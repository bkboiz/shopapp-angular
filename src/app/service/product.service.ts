import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../dtos/response/product.response";
import { GetProductResponse } from "../dtos/response/get.product.response";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiGetProducts = 'http://localhost:8039/api/v1/product';

    constructor(private http: HttpClient) { };

    getProducts(page: number, limit: number): Observable<GetProductResponse> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('limit', limit.toString());

        return this.http.get<GetProductResponse>(this.apiGetProducts, { params });

    }

}