import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Review } from 'src/app/core/models/review/review';
import { ReviewService } from 'src/app/core/services/review/review.service';
import { StarsComponent } from '../stars/stars.component';

import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonTextarea,
  IonInput,
  IonButton,
  IonLabel,
  IonImg,
  IonSpinner,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateReviewRequest } from 'src/app/core/models/review/create-review-request';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiResponse } from 'src/app/core/models/api-response';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StarsComponent,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonText,
    IonContent,
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonTextarea,
    IonInput,
    IonButton,
    IonLabel,
    IonImg,
    IonSpinner,
  ],
})
export class ReviewComponent implements OnInit, OnDestroy {
  @Input() changaId: string = '';
  @Input() reviewerId: string = '';
  @Input() readonly: boolean = false;

  review: Review | null = null;
  rating: number = 0;
  reviewForm!: FormGroup;

  subscription: any;
  showCreateModal = false;
  showInfoModal = false;

  loaded: boolean = false;

  constructor(
    private reviewService: ReviewService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.changaId) {
      throw new Error('Changa ID is required');
    }

    if (!this.reviewerId) {
      throw new Error('Reviewer ID is required');
    }

    this.fetchReviewInfo();
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleOpenModal() {
    if (this.review) {
      this.showInfoModal = true;
      return;
    }
    
    this.showCreateModal = true;
  }

  handleRatingChange(rating: number) {
    this.rating = rating;
    this.reviewForm.patchValue({ rating });
    this.handleOpenModal();
  }

  handleModalDismiss(_event: any) {
    this.showCreateModal = false;
    this.showInfoModal = false;
  }

  submitReview() {
    if (!this.reviewForm.valid) {
      console.error('Review form is invalid');
      return;
    }

    const reviewData: CreateReviewRequest = {
      changa_id: this.changaId,
      ...this.reviewForm.value,
    };

    this.reviewForm.disable();

    this.reviewService.createReview(reviewData).subscribe({
      next: (response: ApiResponse<Review>) => {
        this.review = response.data;
        this.rating = this.review?.rating || 0;
        this.showCreateModal = false;
        this.readonly = true;
      },
      error: (error) => {
        console.error(error);
        this.reviewForm.enable();
      },
    });
  }

  private fetchReviewInfo() {
    this.subscription = this.reviewService
      .getChangaReviewFromCustomer(this.changaId, this.reviewerId)
      .subscribe({
        next: (response) => {
          this.review = response.data;
          this.rating = this.review?.rating || 0;
        },
        error: (error) => {
          if (error.status === 404) {
            console.log('Customer has not reviewed yet');
            return;
          }
          console.error('Error fetching review', error);
        },
      });

    this.loaded = true;
  }

  private initializeForm() {
    this.reviewForm = this.formBuilder.group({
      rating: [
        this.rating,
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      comment: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
      photo_url: [null],
    });
  }
}
