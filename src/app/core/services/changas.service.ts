import { Injectable } from '@angular/core';
import { ChangaOverview } from '../models/changa-overview.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChangasService {
  private baseUrl = 'http://localhost:8080/api/v1/changas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllChangas(): Observable<ChangaOverview[]> {
    return this.http.get<ChangaOverview[]>(`${this.baseUrl}`);
  }

  getChangaById(id: string): Observable<ChangaOverview> {
    return this.http.get<ChangaOverview>(`${this.baseUrl}/${id}`);
  }

  hireChanga(changaId: string) {
    const customer: User = this.authService.getUserAuthenticated();

    const payload = {
      changa_id: changaId,
      customer_id: customer.id,
    };

    return this.http.post(`${this.baseUrl}/hire`, payload, {
      responseType: 'text',
    });
  }
}
