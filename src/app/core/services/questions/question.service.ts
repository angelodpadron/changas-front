import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../../models/api-response';
import { HttpClient } from '@angular/common/http';
import { CreateQuestionRequest } from '../../models/question/create-question-request';
import { Inquiry } from '../../models/question/inquiry';

@Injectable({
  providedIn: 'root',
})
export class InquiryService {
  private baseUrl = environment.fullApiUrl + '/inquiries';

  constructor(private http: HttpClient) {}

  postQuestion(
    request: CreateQuestionRequest
  ): Observable<ApiResponse<Inquiry>> {
    return this.http.post<ApiResponse<Inquiry>>(
      `${this.baseUrl}`,
      request
    );
  }  

  getChangaInquiries(changaId: string): Observable<ApiResponse<Inquiry[]>> {
    return this.http.get<ApiResponse<Inquiry[]>>(`${this.baseUrl}/changa/${changaId}`);
  }
}
