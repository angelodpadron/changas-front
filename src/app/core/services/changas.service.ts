import { Injectable } from '@angular/core';
import { ChangaOverview } from '../models/changa-overview';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Customer } from '../models/customer.model';
import { ApiResponse } from '../models/api-response';
import { CreateChangaRequest } from '../models/create-changa-request';
import { HireChangaRequest } from '../models/hire-changa-request';

@Injectable({
  providedIn: 'root',
})
export class ChangasService {
  private baseUrl = 'http://localhost:8080/api/v1/changas';
  
  constructor(
    private http: HttpClient,
    private authService: AuthService  ) {}
  
  getAllChangas(): Observable<ApiResponse<ChangaOverview[]>> {
    return this.http.get<ApiResponse<ChangaOverview[]>>(`${this.baseUrl}`);
  }
  
  getChangaById(id: string): Observable<ApiResponse<ChangaOverview>> {
    return this.http.get<ApiResponse<ChangaOverview>>(`${this.baseUrl}/${id}`);
  }
  
  searchChangasByTopic(topic: string) {
    const requestParams = { topics: [topic] };
    return this.http.get<ApiResponse<ChangaOverview[]>>(
      `${this.baseUrl}/findBy`,
      { params: requestParams }
    );

  }

  createChanga(
    createChangaRequest: CreateChangaRequest
  ): Observable<ApiResponse<ChangaOverview>> {
    return this.http.post<ApiResponse<ChangaOverview>>(
      `${this.baseUrl}/create`,
      createChangaRequest
    );
  }

  hireChanga(hireChangaRequest: HireChangaRequest) {
    return this.authService.getUserAuthenticated().pipe(
      switchMap((customer: Customer | null) => {
        if (!customer) {
          throw new Error('No user authenticated');
        }

        return this.http.post(`${this.baseUrl}/hire`, hireChangaRequest, {
          responseType: 'text',
        });
      })
    );
  }
}
