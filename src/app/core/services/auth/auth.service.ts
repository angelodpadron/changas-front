import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '../../models/customer/auth-request-response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Customer } from '../../models/customer/customer.model';
import { ApiResponse } from '../../models/api-response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.fullApiUrl + '/auth';
  private readonly TOKEN_KEY = environment.tokenKey;

  private userAuthenticationSubject = new BehaviorSubject<Customer | null>(
    null
  );

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.initializeUserAuthentication();
  }

  private async initializeUserAuthentication() {
    const token = this.getToken();

    if (token && this.tokenIsValid(token)) {
      const user = this.decodeToken(token);
      this.userAuthenticationSubject.next(user);
      return;
    }

    this.signout();
  }
  
  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const tokenIsValid = token ? this.tokenIsValid(token) : false;
    const userIsAuthenticated = this.userAuthenticationSubject.getValue();
    
    return tokenIsValid && userIsAuthenticated !== null;
  }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap((response: ApiResponse<LoginResponse>) => {
          this.setToken(response.data.token);
          this.setAuthenticatedUserWithToken(response.data.token);
        })
      );
  }

  signout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userAuthenticationSubject.next(null);
  }

  tokenIsValid(token: string): boolean {
    return !this.jwtHelperService.isTokenExpired(token);
  }

  getUserAuthenticated(): Observable<Customer | null> {
    return this.userAuthenticationSubject.asObservable();
  }

  private setAuthenticatedUserWithToken(token: string) {
    const user = this.decodeToken(token);
    this.userAuthenticationSubject.next(user);
  }

  private decodeToken(token: string): Customer {
    const decodedJwt = this.jwtHelperService.decodeToken(token);
    return {
      id: +decodedJwt['id'],
      name: decodedJwt['name'],
      email: decodedJwt['email'],
      photo_url: decodedJwt['photo'],
    };
  }

  
}
