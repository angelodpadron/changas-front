import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { HiringDetails } from '../../models/transactions/hiring-details';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private baseUrl = environment.fullApiUrl + '/transactions';

  constructor(private http: HttpClient) {}

  acceptHiringRequest(
    hiringTransactionId: string
  ): Observable<ApiResponse<HiringDetails>> {
    let payload = {
      transaction_id: hiringTransactionId,
      response: 'ACCEPT',
    };

    return this.http.post<ApiResponse<HiringDetails>>(
      `${this.baseUrl}/respond-request`,
      payload
    );
  }

  declineHiringRequest(
    hiringTransactionId: string
  ): Observable<ApiResponse<HiringDetails>> {
    let payload = {
      transaction_id: hiringTransactionId,
      response: 'DECLINE',
    };

    return this.http.post<ApiResponse<HiringDetails>>(
      `${this.baseUrl}/respond-request`,
      payload
    );
  }
}
