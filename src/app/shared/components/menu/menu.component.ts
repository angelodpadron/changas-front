import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  IonMenu,
  IonAvatar,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CustomerOverviewComponent } from '../customer-overview/customer-overview.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonMenu,
    IonAvatar,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    CustomerOverviewComponent,
  ],
})
export class MenuComponent implements OnInit, OnDestroy {
  userAuthenticated: User | null = null;
  private userAuthenticatedSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userAuthenticatedSubscription = this.authService
      .getUserAuthenticated()
      .subscribe({
        next: (user) => {
          this.userAuthenticated = user;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnDestroy() {
    this.userAuthenticatedSubscription.unsubscribe();
  }

  signout() {
    this.authService.signout();
  }
}
