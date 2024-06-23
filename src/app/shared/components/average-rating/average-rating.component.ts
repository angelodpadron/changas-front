import { Component, Input, OnInit } from '@angular/core';
import { AverageRating } from 'src/app/core/models/review/average-rating';
import { ReviewService } from 'src/app/core/services/review/review.service';
import { StarsComponent } from '../stars/stars.component';

import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-average-rating',
  templateUrl: './average-rating.component.html',
  styleUrls: ['./average-rating.component.scss'],
  standalone: true,
  imports: [StarsComponent, IonGrid, IonRow, IonCol],
})
export class AverageRatingComponent implements OnInit {
  @Input() changaId!: string;
  averageRating!: AverageRating;
  loaded = false;

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    if (!this.changaId) {
      throw new Error('Changa ID is required');
    }

    this.reviewService.getChangaAverageRating(this.changaId).subscribe((response) => {
      this.averageRating = response.data;
      this.loaded = true;
    });
  }
}
