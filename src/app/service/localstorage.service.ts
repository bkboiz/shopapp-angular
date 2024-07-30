import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    userId!: number;

    getUserId(): number {
        const user = localStorage.getItem('user');
        return user != null ? JSON.parse(user).userId : 0;
    }

}