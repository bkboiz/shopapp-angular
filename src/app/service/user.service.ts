import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiRegister = API_URL + "user/register";
  private apiLogin = API_URL + "user/login";

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  private apiConfig = {
    headers: this.createHeader()
  }

  constructor(private http: HttpClient) { }

  private createHeader(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  register(registerData: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiRegister, registerData, {
      headers: this.createHeader(),
      observe: 'response'
    });
  }

  login(loginDto: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.apiLogin, loginDto, {
      headers: this.createHeader(),
      observe: 'response'
    }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.status === 200 && response.body) {
          this.userSubject.next(response.body);  // Cập nhật trạng thái người dùng
        }
      })
    );
  }

}
