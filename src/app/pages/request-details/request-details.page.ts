import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonBackButton,
  IonButtons,
  IonSpinner,
} from '@ionic/angular/standalone';
import { HiringDetails } from 'src/app/core/models/hiring-details.model';
import { CustomersService } from 'src/app/core/services/customers.service';
import { User } from 'src/app/core/models/user.model';
import { CustomerOverviewComponent } from 'src/app/shared/components/customer-overview/customer-overview.component';
import { TransactionStatusComponent } from 'src/app/shared/components/transaction-status/transaction-status.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subject, of, switchMap, takeUntil } from 'rxjs';
import { TransactionsService } from 'src/app/core/services/transactions.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.page.html',
  styleUrls: ['./request-details.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonBackButton,
    IonButtons,
    IonSpinner,
    CustomerOverviewComponent,
    TransactionStatusComponent,
  ],
})
export class RequestDetailsPage implements OnInit, OnDestroy {
  @Input('id')
  hiringTransactionId: string = '';

  hiringDetails!: HiringDetails;
  customerDetails!: User;

  isProvider: boolean = false;
  loaded: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private customersService: CustomersService,
    private authService: AuthService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadInitialData() {
    if (!this.hiringTransactionId) {
      console.error('Hiring Transaction ID is required');
      return;
    }

    this.customersService
      .getHiringDetails(this.hiringTransactionId)
      .pipe(
        takeUntil(this.destroy$),
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

          if (!this.isProvider) {
            return this.customersService.getCustomerDetails(
              this.hiringDetails.provider_id
            );
          }

          return of(null);
        })
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.customerDetails = response.data;
            this.loaded = true;
          }
        },
        error: (error) => {
          console.error('Error in processing', error.message);
        },
      });
  }

  canRespondToRequest() {
    return (
      this.hiringDetails.status === 'AWAITING_PROVIDER_CONFIRMATION' &&
      this.isProvider
    );
  }

  acceptRequest() {
    this.transactionsService
      .acceptHiringRequest(this.hiringTransactionId)
      .subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Request accepted');
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
            console.log('Request declined');
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
}
