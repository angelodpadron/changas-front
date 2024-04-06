import { Injectable } from '@angular/core';
import { ChangaOverview } from '../models/changa-overview.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangasAPIService {
  private baseUrl = 'http://localhost:8080/api/v1/changas';

  constructor(private http: HttpClient) {}

  getAllChangas(): Observable<ChangaOverview[]> {
    return this.http.get<ChangaOverview[]>(`${this.baseUrl}`);
  }

  getChangaById(id: string): Observable<ChangaOverview> {
    return this.http.get<ChangaOverview>(`${this.baseUrl}/${id}`);
  }

  hireChanga(customerId: string, changaId: string) {
    const payload = {
      changaId: changaId,
      customerId: customerId,
    };

    return this.http.post(`${this.baseUrl}/hire`, payload, {
      responseType: 'text',
    });
  }
}
