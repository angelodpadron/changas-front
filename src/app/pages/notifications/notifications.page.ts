import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { Inquiry } from 'src/app/core/models/question/inquiry';
import { InquiryService } from 'src/app/core/services/questions/question.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class NotificationsPage implements OnInit {
  inquiries: Inquiry[] = [];

  constructor(private inquiryService: InquiryService) {}

  ngOnInit() {
    this.inquiryService.getPendingToAnswer().subscribe((response) => {
      this.inquiries = response.data;
    });
  }
}
