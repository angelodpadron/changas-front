import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { Customer } from '../../models/customer/customer.model';

import { environment } from 'src/environments/environment';
import { UpdateCustomerRequest } from '../../models/customer/update-customer-request';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl = environment.fullApiUrl + '/customers';

  constructor(private http: HttpClient) {}

  getCustomerDetails(hiringTransactionId: string) {
    return this.http.get<ApiResponse<Customer>>(
      `${this.baseUrl}/${hiringTransactionId}`
    );
  }

  updateCustomer(
    updateRequest: UpdateCustomerRequest
  ): Observable<ApiResponse<Customer>> {
    return this.http.put<ApiResponse<Customer>>(
      `${this.baseUrl}/edit`,
      updateRequest
    );
  }
}
