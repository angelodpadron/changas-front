import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { CustomersService } from 'src/app/core/services/customers.service';
import { HiringDetails } from 'src/app/core/models/hiring-details';
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
    TransactionStatusComponent,
  ],
})
export class HiringsPage implements OnInit {
  hiringsDetails: HiringDetails[] = [];

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.customersService.getHirings().subscribe({
      next: (response: ApiResponse<HiringDetails[]>) => {
        if (response.success) {
          console.log('Hiring details:', response.data);
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
