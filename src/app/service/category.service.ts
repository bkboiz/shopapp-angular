import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../dtos/response/product.response";
import { GetProductResponse } from "../dtos/response/get.product.response";
import { Category } from "../dtos/response/category.response";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiGetCategories = 'http://localhost:8039/api/v1/category';

    constructor(private http: HttpClient) { };

    getCategories(): Observable<Category> {
        return this.http.get<Category>(this.apiGetCategories, {});
    }

}