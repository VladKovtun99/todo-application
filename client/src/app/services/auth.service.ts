import { inject, Injectable } from '@angular/core';
import { RegisterDto } from '../models/register.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoggedInUserDto } from '../models/logged-in-user.dto';
import {LoginDto} from '../models/login.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);

  private currentUserSubject = new BehaviorSubject<LoggedInUserDto | null>(null);
  public currentUser$: Observable<LoggedInUserDto | null> = this.currentUserSubject.asObservable();

  private isAuthenticated$ = new BehaviorSubject<boolean>(this.hasValidToken());
  public isAuthenticated = this.isAuthenticated$.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken = jwtDecode<any>(token);
        if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
          this.logout();
          return;
        }

        this.currentUserSubject.next(decodedToken);
        this.isAuthenticated$.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  register(registerDto: RegisterDto): Observable<any> {
    console.log(JSON.stringify(registerDto));
    return this.http.post<any>(environment.apiUrl + '/register/', registerDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      tap(response => {
        if (response.access) {
          localStorage.setItem('accessToken', response.access);
          if (response.refresh) {
            localStorage.setItem('refreshToken', response.refresh);
          }

          const decodedToken = jwtDecode<LoggedInUserDto>(response.access);
          this.currentUserSubject.next(decodedToken);
          this.isAuthenticated$.next(true);
        }
      })
    );
  }

  login(loginDto: LoginDto): Observable<any> {
    console.log(JSON.stringify(loginDto));
    return this.http.post<any>(environment.apiUrl + '/login/', loginDto, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(
      tap(response => {
        if (response.access) {
          localStorage.setItem('accessToken', response.access);
          if (response.refresh) {
            localStorage.setItem('refreshToken', response.refresh);
          }

          const decodedToken = jwtDecode<LoggedInUserDto>(response.access);
          this.currentUserSubject.next(decodedToken);
          this.isAuthenticated$.next(true);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.currentUserSubject.next(null);
    this.isAuthenticated$.next(false);
  }

  getCurrentUser(): LoggedInUserDto | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
