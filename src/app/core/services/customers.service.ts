import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HiringDetails } from '../models/hiring-details.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  private baseUrl = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHirings(): Observable<HiringDetails[]> {
    const accessToken = localStorage.getItem('accessToken');

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${accessToken}`,
    //   }),
    // };

    const user: User = this.authService.getUserAuthenticated();
    return this.http.get<HiringDetails[]>(
      `${this.baseUrl}/${user.id}/hirings`
    );
  }
}
