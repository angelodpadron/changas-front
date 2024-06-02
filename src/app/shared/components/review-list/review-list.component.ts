import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/core/models/review/review';
import { ReviewService } from 'src/app/core/services/review/review.service';
import { StarsComponent } from '../stars/stars.component';
import {
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonNote,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    StarsComponent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonNote,
  ],
})
export class ReviewListComponent implements OnInit {
  @Input() changaId!: string;

  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    if (!this.changaId) {
      throw new Error('Changa ID is required');
    }

    this.reviewService.getReviewsFor(this.changaId).subscribe((response) => {
      this.reviews = response.data;
    });
  }
}
