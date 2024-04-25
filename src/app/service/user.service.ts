import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrlApi = "http:localhost:8080/api/v1/user/register";

  constructor(private http: HttpClient) {

  }

  register(registerData: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.userUrlApi, registerData, { headers })
  }

}
