import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestionOverview } from '../../models/question/question-overview';
import { ApiResponse } from '../../models/api-response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = environment.fullApiUrl + '/queries/question';
  private baseUrl1 = environment.fullApiUrl + '/queries';

  constructor(private http: HttpClient) { }

  sendQuery(question: QuestionOverview, id: string): Observable<ApiResponse<QuestionOverview>>{
    return this.http.post<ApiResponse<QuestionOverview>>(`${this.baseUrl}/${id}`, question);
  }

  getAllQueries(): Observable<ApiResponse<QuestionOverview[]>>{
    return this.http.get<ApiResponse<QuestionOverview[]>>(`${this.baseUrl1}`);
  }
}
