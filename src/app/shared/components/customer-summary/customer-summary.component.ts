import { Component, Input, OnInit } from '@angular/core';
import { AverageRating } from 'src/app/core/models/review/average-rating';
import { ReviewService } from 'src/app/core/services/review/review.service';

import { IonItem, IonLabel } from '@ionic/angular/standalone';
import { StarsComponent } from '../stars/stars.component';

@Component({
  selector: 'app-customer-summary',
  templateUrl: './customer-summary.component.html',
  styleUrls: ['./customer-summary.component.scss'],
  standalone: true,
  imports: [StarsComponent, IonItem, IonLabel],
})
export class CustomerSummaryComponent implements OnInit {
  @Input() customerId: number | null = null;

  averageRating: AverageRating = {
    average: 0,
    amount: 0,
  };

  loaded = false;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    if (!this.customerId) {
      throw new Error('Customer ID is required');
    }

    this.reviewService
      .getCustomerAverageRating(this.customerId.toString())
      .subscribe({
        next: (response) => {
          this.averageRating = response.data;
          this.loaded = true;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
