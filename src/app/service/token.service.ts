import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {
    private readonly TOKEN_KEY = 'accessToken';
    constructor() { }

    getToken(): string | null {
        return sessionStorage.getItem(this.TOKEN_KEY);
    }

    setToken(token: string): void {
        sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    removeToken(): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
    }
}