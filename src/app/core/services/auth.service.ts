import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '../models/auth-request-response-body';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response-body';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  private readonly TOKEN_KEY = 'accessToken';

  private userAuthenticationSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    this.initializeUserAuthentication();
  }

  private async initializeUserAuthentication() {
    const token = await this.jwtHelperService.tokenGetter();

    if (typeof token === 'string' && this.tokenIsValid(token)) {
      const user = this.decodeToken(token);
      this.userAuthenticationSubject.next(user);
      return;
    }

    localStorage.removeItem('accessToken');
    this.userAuthenticationSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.userAuthenticationSubject.value !== null;
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

  getUserAuthenticated(): Observable<User | null> {
    return this.userAuthenticationSubject.asObservable();
  }

  private setAuthenticatedUserWithToken(token: string) {
    const user = this.decodeToken(token);
    this.userAuthenticationSubject.next(user);
  }

  private decodeToken(token: string): User {
    const decodedJwt = this.jwtHelperService.decodeToken(token);
    return {
      id: +decodedJwt['id'],
      name: decodedJwt['name'],
      email: decodedJwt['email'],
      photoUrl: decodedJwt['photo'],
    };
  }

  private setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
