import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hiring-success',
  templateUrl: './hiring-success.page.html',
  styleUrls: ['./hiring-success.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonText,
    RouterModule,
  ],
})
export class HiringSuccessPage {
  constructor() {}
}
