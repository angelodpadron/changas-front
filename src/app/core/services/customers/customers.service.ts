import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HiringDetails } from '../../models/transactions/hiring-details';
import { ApiResponse } from '../../models/api-response';
import { Customer } from '../../models/customer/customer.model';

import { environment } from 'src/environments/environment';

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

  updateCustomer(customer: Customer): Observable<any>{
    var header = new HttpHeaders({
      "Accept" : "application/json",
    "Content-Type" : "application/json"});
    return this.http.put(`${this.baseUrl}/profile`, customer, {headers:header}
    );
  }
}
