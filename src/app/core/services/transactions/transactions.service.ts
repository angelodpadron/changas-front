import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { HiringDetails } from '../../models/transactions/hiring-details';

import { environment } from 'src/environments/environment';
import { TransactionStatus } from '../../models/transactions/transaction-status';
import { HireChangaRequest } from '../../models/transactions/hire-changa-request';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private baseUrl = environment.fullApiUrl + '/transactions';

  constructor(private http: HttpClient) {}

  hireChanga(
    hireChangaRequest: HireChangaRequest
  ): Observable<ApiResponse<HiringDetails>> {
    return this.http.post<ApiResponse<HiringDetails>>(
      `${this.baseUrl}/request`,
      hireChangaRequest
    );
  }

  getHirings(): Observable<ApiResponse<HiringDetails[]>> {
    return this.http.get<ApiResponse<HiringDetails[]>>(`${this.baseUrl}`);
  }

  getHiringDetails(hiringId: string): Observable<ApiResponse<HiringDetails>> {
    return this.http.get<ApiResponse<HiringDetails>>(
      `${this.baseUrl}/${hiringId}`
    );
  }

  getHiringsWithStatus(
    status: TransactionStatus
  ): Observable<ApiResponse<HiringDetails[]>> {
    return this.http.get<ApiResponse<HiringDetails[]>>(
      `${this.baseUrl}/filter?status=${status}`
    );
  }

  sendConditionsToRequester(
    hiringTransactionId: string,
    responseMessage: string,
    responsePrice: number
  ): Observable<ApiResponse<HiringDetails>> {
    const payload = {
      transaction_id: hiringTransactionId,
      response: 'ACCEPT',
      provider_proposal: {
        message: responseMessage,
        price: responsePrice,
      },
    };

    return this.http.post<ApiResponse<HiringDetails>>(
      `${this.baseUrl}/respond-request`,
      payload
    );
  }

  acceptHiringRequest(
    hiringTransactionId: string
  ): Observable<ApiResponse<HiringDetails>> {
    const payload = {
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
    const payload = {
      transaction_id: hiringTransactionId,
      response: 'DECLINE',
    };

    return this.http.post<ApiResponse<HiringDetails>>(
      `${this.baseUrl}/respond-request`,
      payload
    );
  }
}
