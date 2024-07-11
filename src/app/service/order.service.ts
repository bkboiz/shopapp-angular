import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";

const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private orderApi = API_URL + "order";
    private apiConfig = {
        headers: this.createHeader()
    }

    constructor(private http: HttpClient) { }

    private createHeader(): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    order(orderInfo: any): Observable<any> {
        return this.http.post(this.orderApi, orderInfo, this.apiConfig);
    }
}