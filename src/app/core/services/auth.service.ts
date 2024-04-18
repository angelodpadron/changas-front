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

  private userAuthenticationSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const user = this.decodeToken(token);
      this.userAuthenticationSubject.next(user);
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');

    const isAuthenticated = !!token;
    return isAuthenticated;
  }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<ApiResponse<LoginResponse>> {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap((response: ApiResponse<LoginResponse>) => {
          localStorage.setItem('accessToken', response.data.token);
          this.setAuthenticatedUserWithToken(response.data.token);
        })
      );
  }

  getUserAuthenticated(): Observable<User | null> {
    return this.userAuthenticationSubject.asObservable();
  }

  setAuthenticatedUserWithToken(token: string) {
    const user = this.decodeToken(token);
    this.userAuthenticationSubject.next(user);
  }

  decodeToken(token: string): User {
    const decodedJwt = this.jwtHelperService.decodeToken(token);
    return {
      id: +decodedJwt['id'],
      name: decodedJwt['name'],
      email: decodedJwt['email'],
      photoUrl: decodedJwt['photo'],
    };
  }

  signout() {
    localStorage.removeItem('accessToken');
    this.userAuthenticationSubject.next(null);
  }
}
