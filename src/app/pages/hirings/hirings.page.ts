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
} from '@ionic/angular/standalone';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { HiringDetails } from 'src/app/core/models/transactions/hiring-details';
import { ApiResponse } from 'src/app/core/models/api-response';
import { RouterModule } from '@angular/router';
import { TransactionStatusComponent } from 'src/app/shared/components/transaction-status/transaction-status.component';

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
  ],
})
export class HiringsPage implements OnDestroy{
  hiringsDetails: HiringDetails[] = [];
  subscription: any;

  constructor(private customersService: CustomersService) {}

  ionViewWillEnter() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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

  private initializeHirings() {
    this.subscription = this.customersService.getHirings().subscribe({
      next: (response: ApiResponse<HiringDetails[]>) => {
        if (response.success) {
          this.hiringsDetails = response.data;
        } else {
          console.error(response.error?.message);
        }
      },
      error: (error) =>
        console.error('Error retrieving hiring details:', error),
    });
  }
}
