

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginRequest, LoginResponse } from '../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dev-api.wanasti.com/api/v1/user/login?lang=en&currencyCode=KW';
  private authToken = 'dAwMpo/TAWLhFrwwr3Wzcmc8XTdmAgp6zmGLsFmJ9HAnEbTQAg937i/hqKFjtFVQ4TnQ2y6xlVSeTKy3VWcxvalwvmPq6qF7+UcLd3wBXYoVQ2Puj49mTweKh/v2Rvj9zyVjfbexFkjMNZ5XyGucmdOI6XMmI98Zvu38Jh1fOo8157YxlgCozKkonixczjGIn3RKLuv7v3gXDRl4irzRcS6lYKGJB8vfA847GUppsVjdZV9bAjADfqUP2Iyl6Nz8MOWrSHNy8tWqhM6mI165rCwH3xMv7HEexmsMO7Mi36c=';
  
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'auth': this.authToken
    });

    const loginData: LoginRequest = {
      email: email,
      phone: '',
      phoneCode: '965',
      password: password,
      deviceToken: '',
      deviceType: '',
      deviceModel: '',
      appVersion: '',
      osVersion: ''
    };

    return this.http.post<LoginResponse>(this.apiUrl, loginData, { headers });
  }

  setLoggedIn(token?: string): void {
    this.isLoggedInSubject.next(true);
    if (token) {
      localStorage.setItem('userToken', token);
    }
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
}