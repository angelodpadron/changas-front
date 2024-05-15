import { Injectable } from '@angular/core';
import { ChangaOverview } from '../../models/changa/changa-overview';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { ApiResponse } from '../../models/api-response';
import { CreateChangaRequest } from '../../models/changa/create-changa-request';
import { HireChangaRequest } from '../../models/transactions/hire-changa-request';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChangasService {
  
  
  private baseUrl =  environment.fullApiUrl +'/changas';
  
  constructor(private http: HttpClient) {}
  
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

  editChanga(changaId: string, form: CreateChangaRequest): Observable<ApiResponse<ChangaOverview>> {
    return this.http.put<ApiResponse<ChangaOverview>>(
      `${this.baseUrl}/${changaId}/edit`,
      form
    );
  }

  deleteChanga(changaId: string): Observable<ApiResponse<ChangaOverview>> {
    return this.http.delete<ApiResponse<ChangaOverview>>(`${this.baseUrl}/${changaId}/delete`);
  }

  hireChanga(hireChangaRequest: HireChangaRequest) {
    return this.http.post(`${this.baseUrl}/hire`, hireChangaRequest, {
      responseType: 'text',
    });
  }
}
