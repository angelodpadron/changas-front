import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HiringDetails } from '../models/hiring-details.model';
import { ApiResponse } from '../models/api-response-body';
import { User } from '../models/user.model';

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

  getHiringDetails(hiringId: string): Observable<ApiResponse<HiringDetails>> {
    return this.http.get<ApiResponse<HiringDetails>>(
      `${this.baseUrl}/hirings/${hiringId}`
    );
  }

  getCustomerDetails(hiringTransactionId: string) {
    return this.http.get<ApiResponse<User>>(
      `${this.baseUrl}/${hiringTransactionId}`
    );
  }

  
}
