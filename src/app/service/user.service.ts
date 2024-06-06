import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRegister = "http://localhost:8039/api/v1/user/register";
  private apiLogin = "http://localhost:8039/api/v1/user/login";
  private apiConfig = {
    headers: this.createHeader()
  }

  constructor(private http: HttpClient) { }

  private createHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  register(registerData: any): Observable<any> {
    return this.http.post(this.apiRegister, registerData, this.apiConfig)
  }

  login(loginDto: any): Observable<any> {
    return this.http.post(this.apiRegister, loginDto, this.apiConfig)
  }

}
