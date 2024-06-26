import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRegister = API_URL + "user/register";
  private apiLogin = API_URL + "user/login";
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
    return this.http.post(this.apiLogin, loginDto, this.apiConfig)
  }

}
