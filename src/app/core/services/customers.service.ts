import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HiringDetails } from '../models/hiring-details.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response-body';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient) {}

  getHirings(): Observable<ApiResponse<HiringDetails[]>> {
    return this.http.get<ApiResponse<HiringDetails[]>>(
      `${this.baseUrl}/hirings`
    );
  }
}
