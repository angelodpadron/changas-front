import { Injectable } from '@angular/core';
import { ChangaOverview } from '../../models/changa/changa-overview';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiResponse } from '../../models/api-response';
import { CreateChangaRequest } from '../../models/changa/create-changa-request';
import { HireChangaRequest } from '../../models/transactions/hire-changa-request';

@Injectable({
  providedIn: 'root',
})
export class ChangasService {
  private baseUrl = 'http://localhost:8080/api/v1/changas';
  
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  getAllChangas(): Observable<ApiResponse<ChangaOverview[]>> {
    return this.http.get<ApiResponse<ChangaOverview[]>>(`${this.baseUrl}`);
  }
  
  getChangaById(id: string): Observable<ApiResponse<ChangaOverview>> {
    return this.http.get<ApiResponse<ChangaOverview>>(`${this.baseUrl}/${id}`);
  }
  
  searchChangasByTitle(title: string) {
    const requestParams = { title };
    return this.http.get<ApiResponse<ChangaOverview[]>>(
      `${this.baseUrl}/findBy`,
      { params: requestParams }
    );
  }
  
  searchChangasByTopic(topics: [string]) {
    const requestParams = { topics };
    return this.http.get<ApiResponse<ChangaOverview[]>>(
      `${this.baseUrl}/findBy`,
      { params: requestParams }
    );
  }

  searchChangasByTitleAndTopics(title: string, topics: [string]) {
    const requestParams = { title, topics };
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
    return this.http.post(`${this.baseUrl}/hire`, hireChangaRequest, {
      responseType: 'text',
    });
  }
}
