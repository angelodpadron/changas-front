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
import { forkJoin } from 'rxjs';

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
  pendingInquiries: Inquiry[] = [];
  unreadAnswers: Inquiry[] = [];

  constructor(private inquiryService: InquiryService) {}

  ngOnInit() {
    this.fetchData();
  }

  private fetchData() {
    forkJoin({
      pendingInquiries: this.inquiryService.getPendingToAnswer(),
      unreadAnswers: this.inquiryService.getUnreadAnswers(),
    }).subscribe({
      next: (response) => {
        this.pendingInquiries = response.pendingInquiries.data;
        this.unreadAnswers = response.unreadAnswers.data;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
    
  }
}
