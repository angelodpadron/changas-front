import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { CustomerOverviewComponent } from 'src/app/shared/components/customer-overview/customer-overview.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    CustomerOverviewComponent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
  ],
})
export class ProfilePage implements OnInit, OnDestroy {
  customer!: Customer;
  subscription: any;

  constructor(private authService: AuthService) {
    addIcons({ logOut });
  }

  ngOnInit() {
    this.subscription = this.authService.getUserAuthenticated().subscribe({
      next: (customer) => {
        this.customer = customer!;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.signout();
  }
}
