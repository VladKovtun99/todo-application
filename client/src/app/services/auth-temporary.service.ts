import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTemporaryService {

  constructor() { }

  setAuth(): void{
    localStorage.setItem('loginStatus', "true");
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loginStatus') === 'true';
  }

  removeAuth(): void{
    localStorage.removeItem('loginStatus');
  }
}
