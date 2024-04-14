import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
} from '../models/auth-request-response-body';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(
    private http: HttpClient,
    private jwtHelperService: JwtHelperService
  ) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');

    const isAuthenticated = !!token;
    return isAuthenticated;
  }

  getUserAuthenticated(): User {
    if (!this.isAuthenticated()) {
      throw new Error('No user authenticated');
    }
    const token = localStorage.getItem('accessToken');
    const decodedJwt = this.jwtHelperService.decodeToken(token!);

    const user: User = {
      id: +decodedJwt['id'],
      name: decodedJwt['name'],
      email: decodedJwt['email'],
      photoUrl: decodedJwt['photo'],
    };

    return user;
  }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, loginRequest);
  }

  signout() {
    localStorage.removeItem('accessToken');
  }
}
