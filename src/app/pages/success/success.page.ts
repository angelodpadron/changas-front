import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
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
export class SuccessPage implements OnInit {
  message: string = '';
  buttonText: string = '';
  route = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.message = state['message'];
      this.buttonText = state['buttonText'];
      this.route = state['route'];
      return;
    }

    throw new Error(
      'Missing parameter. Make sure to pass the message, buttonText, and route parameters when navigating to this page.'
    );
  }

  onButtonClick() {
    this.router.navigate([this.route]);
  }
}
