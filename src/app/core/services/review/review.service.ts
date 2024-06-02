import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateReviewRequest } from '../../models/review/create-review-request';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { Review } from '../../models/review/review';
import { AverageRating } from '../../models/review/average-rating';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = environment.fullApiUrl + '/reviews';

  constructor(private http: HttpClient) {}

  createReview(
    createReviewRequest: CreateReviewRequest
  ): Observable<ApiResponse<Review>> {
    return this.http.post<ApiResponse<Review>>(
      this.baseUrl,
      createReviewRequest
    );
  }

  getChangaReviewFromCustomer(
    changaId: string,
    customerId: string
  ): Observable<ApiResponse<Review>> {
    return this.http.get<ApiResponse<Review>>(
      `${this.baseUrl}/customer/${customerId}?changaId=${changaId}`
    );
  }

  getAverageRating(changaId: string): Observable<ApiResponse<AverageRating>> {
    return this.http.get<ApiResponse<AverageRating>>(
      `${this.baseUrl}/changa/${changaId}`
    );
  }
}
