import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonAvatar,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  homeOutline,
  personCircleOutline,
  searchOutline,
  addOutline,
  briefcaseOutline,
  notificationsOutline,
} from 'ionicons/icons';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonAvatar],
})
export class TabsComponent implements OnInit, OnDestroy {
  userAuthenticated: Customer | null = null;
  private userAuthenticatedSubscription: Subscription = new Subscription();

  constructor(private authSerivce: AuthService) {
    addIcons({
      homeOutline,
      searchOutline,
      personCircleOutline,
      addOutline,
      briefcaseOutline,
      notificationsOutline,
    });
  }

  ngOnInit() {
    this.userAuthenticatedSubscription = this.authSerivce
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
}
