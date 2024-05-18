import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HiringDetails } from '../../models/transactions/hiring-details';
import { ApiResponse } from '../../models/api-response';
import { Customer } from '../../models/customer/customer.model';

import { environment } from 'src/environments/environment';
import { UpdateCustomerRequest } from '../../models/customer/update-customer-request';
import { TransactionStatus } from '../../models/transactions/transaction-status';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl = environment.fullApiUrl + '/customers';

  constructor(private http: HttpClient) {}

  getHirings(): Observable<ApiResponse<HiringDetails[]>> {
    return this.http.get<ApiResponse<HiringDetails[]>>(
      `${this.baseUrl}/hirings`
    );
  }

  getHiringsWithStatus(status: TransactionStatus): Observable<ApiResponse<HiringDetails[]>> {
    return this.http.get<ApiResponse<HiringDetails[]>>(
      `${this.baseUrl}/hirings/filter?status=${status}`
    );
  }

  getHiringDetails(hiringId: string): Observable<ApiResponse<HiringDetails>> {
    return this.http.get<ApiResponse<HiringDetails>>(
      `${this.baseUrl}/hirings/${hiringId}`
    );
  }

  getCustomerDetails(hiringTransactionId: string) {
    return this.http.get<ApiResponse<Customer>>(
      `${this.baseUrl}/${hiringTransactionId}`
    );
  }

  updateCustomer(
    updateRequest: UpdateCustomerRequest
  ): Observable<ApiResponse<Customer>> {
    return this.http.put<ApiResponse<Customer>>(
      `${this.baseUrl}/profile`,
      updateRequest
    );
  }
}
