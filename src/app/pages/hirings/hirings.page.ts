import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonRow,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { HiringDetails } from 'src/app/core/models/transactions/hiring-details';
import { ApiResponse } from 'src/app/core/models/api-response';
import { RouterModule } from '@angular/router';
import { TransactionStatusComponent } from 'src/app/shared/components/transaction-status/transaction-status.component';
import { TransactionStatus } from 'src/app/core/models/transactions/transaction-status';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';

@Component({
  selector: 'app-hirings',
  templateUrl: './hirings.page.html',
  styleUrls: ['./hirings.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    TransactionStatusComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonList,
    IonLabel,
    IonItem,
    IonImg,
    IonCardContent,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonThumbnail,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonBackButton,
    IonButtons,
    IonRefresher,
    IonRefresherContent,
    IonSegment,
    IonSegmentButton,
    IonSpinner,
  ],
})
export class HiringsPage implements OnDestroy {
  hiringsDetails: HiringDetails[] = [];
  subscription: any;
  loaded = false;

  constructor(
    private transactionService: TransactionsService
  ) {}

  ionViewWillEnter() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.loaded = false;
    this.initializeHirings();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  doRefresh(event: any) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.initializeHirings();
    event.target.complete();
  }

  segmentChanged(event: CustomEvent) {
    this.loaded = false;
    switch (event.detail.value) {
      case 'all':
        this.initializeHirings();
        break;
      case 'awaiting-provider':
        this.initializeHiringsWithStatus(
          TransactionStatus.AWAITING_PROVIDER_CONFIRMATION
        );
        break;
      case 'awaiting-requester':
        this.initializeHiringsWithStatus(
          TransactionStatus.AWAITING_REQUESTER_CONFIRMATION
        );
        break;
      case 'rejected-provider':
        this.initializeHiringsWithStatus(
          TransactionStatus.DECLINED_BY_PROVIDER
        );
        break;
      case 'rejected-requester':
        this.initializeHiringsWithStatus(
          TransactionStatus.DECLINED_BY_REQUESTER
        );
        break;
      case 'accepted-requester':
        this.initializeHiringsWithStatus(
          TransactionStatus.ACCEPTED_BY_REQUESTER
        );
        break;
    }
  }

  private initializeHiringsWithStatus(status: TransactionStatus) {
    this.subscription = this.transactionService
      .getHiringsWithStatus(status)
      .subscribe({
        next: (response: ApiResponse<HiringDetails[]>) => {
          if (response.success) {
            this.hiringsDetails = response.data;
            this.loaded = true;
          } else {
            console.error(response.error?.message);
          }
        },
        error: (error) =>
          console.error('Error retrieving hiring details:', error),
      });
  }

  private initializeHirings() {
    this.subscription = this.transactionService.getHirings().subscribe({
      next: (response: ApiResponse<HiringDetails[]>) => {
        if (response.success) {
          this.hiringsDetails = response.data;
          this.loaded = true;
        } else {
          console.error(response.error?.message);
        }
      },
      error: (error) =>
        console.error('Error retrieving hiring details:', error),
    });
  }
}
