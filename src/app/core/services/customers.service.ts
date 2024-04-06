import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HiringDetails } from '../models/hiring-details.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient) {}

  getHirings(userId: string): Observable<HiringDetails[]> {
    return this.http.get<HiringDetails[]>(`${this.baseUrl}/${userId}/hirings`);
  }
}