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
import { HiringDetails } from 'src/app/core/models/hiring-details.model';

@Component({
  selector: 'app-hirings',
  templateUrl: './hirings.page.html',
  styleUrls: ['./hirings.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class HiringsPage implements OnInit {
  hiringsDetails: HiringDetails[] = [];

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.customersService.getHirings().subscribe({
      next: (data) => (this.hiringsDetails = data),
      error: (error) =>
        console.error('Error retrieving hiring details:', error),
    });
  }
}
