import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButton,
  IonBackButton,
  IonButtons,
  IonSpinner,
  IonInput,
  IonLabel,
  IonItem,
  IonTextarea,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonModal,
  IonRippleEffect,
} from '@ionic/angular/standalone';
import { HiringDetails } from 'src/app/core/models/transactions/hiring-details';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { CustomerOverviewComponent } from 'src/app/shared/components/customer-overview/customer-overview.component';
import { TransactionStatusComponent } from 'src/app/shared/components/transaction-status/transaction-status.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { switchMap } from 'rxjs';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReviewComponent } from 'src/app/shared/components/review/review.component';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonImg,
    IonButton,
    IonBackButton,
    IonButtons,
    IonSpinner,
    IonInput,
    IonLabel,
    IonItem,
    IonTextarea,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol,
    IonModal,
    IonRippleEffect,
    CustomerOverviewComponent,
    TransactionStatusComponent,
    ReviewComponent,
  ],
})
export class RequestDetailsPage implements OnInit {
  @Input('id') hiringTransactionId: string = '';
  hiringDetails!: HiringDetails;
  customerDetails!: Customer;

  responseMessage: string = '';
  responsePrice: number = 0;
  isProvider: boolean = false;

  rating: number = 0;
  comment: string = '';
  photo_url: string = '';

  loaded: boolean = false;

  constructor(
    private customersService: CustomersService,
    private authService: AuthService,
    private transactionsService: TransactionsService  ) {}

  ngOnInit() {
    this.loadTransactionData();
  }

  private loadTransactionData() {
    this.transactionsService
      .getHiringDetails(this.hiringTransactionId)
      .pipe(
        switchMap((hiringDetails) => {
          if (!hiringDetails.success) {
            throw new Error('Error fetching hiring details');
          }
          this.hiringDetails = hiringDetails.data;
          return this.authService.getUserAuthenticated();
        }),
        switchMap((user) => {
          if (!user) {
            throw new Error('User not authenticated');
          }

          this.isProvider = user.id === +this.hiringDetails.provider_id;

          if (this.isProvider) {
            return this.customersService.getCustomerDetails(
              this.hiringDetails.customer_id
            );
          }

          return this.customersService.getCustomerDetails(
            this.hiringDetails.provider_id
          );
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.customerDetails = response.data;
            this.loaded = true;
          }
        },
        error: (error) => {
          console.error('Error in processing', error.message);
        },
      });
  }

  isProviderResponding() {
    return (
      this.hiringDetails.status === 'AWAITING_PROVIDER_CONFIRMATION' &&
      this.isProvider
    );
  }

  isRequesterResponding() {
    return (
      this.hiringDetails.status === 'AWAITING_REQUESTER_CONFIRMATION' &&
      !this.isProvider
    );
  }

  sendConditionsToRequester() {
    this.transactionsService
      .sendConditionsToRequester(
        this.hiringTransactionId,
        this.responseMessage,
        this.responsePrice
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.hiringDetails = response.data;
          } else {
            console.error('Error accepting request', response.error?.message);
          }
        },
        error: (error) => {
          console.error('Error accepting request', error);
        },
      });
  }

  acceptRequest() {
    this.transactionsService
      .acceptHiringRequest(this.hiringTransactionId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.hiringDetails = response.data;
          } else {
            console.error('Error accepting request', response.error?.message);
          }
        },
        error: (error) => {
          console.error('Error accepting request', error);
        },
      });
  }

  declineRequest() {
    this.transactionsService
      .declineHiringRequest(this.hiringTransactionId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.hiringDetails = response.data;
          } else {
            console.error('Error declining request', response.error?.message);
          }
        },
        error: (error) => {
          console.error('Error declining request', error);
        },
      });
  }

  canShowReview() {
    return this.hiringDetails.status === 'ACCEPTED_BY_REQUESTER';
  }
  
}
