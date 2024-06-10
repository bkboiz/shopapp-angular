import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    constructor(private http: HttpClient) { }
    private apiRoles = 'http://localhost:8039/api/v1/role';
    private apiConfig = {
        headers: this.createHeader()
    }

    private createHeader(): HttpHeaders {
        return new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    getRoles(): Observable<any> {
        return this.http.get(this.apiRoles, this.apiConfig);
    }
}