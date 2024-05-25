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
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonThumbnail,
  IonSegment,
  IonSegmentButton,
  IonButtons,
  IonPopover,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { CustomerOverviewComponent } from 'src/app/shared/components/customer-overview/customer-overview.component';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { addIcons } from 'ionicons';
import {
  logOut,
  create,
  chevronForwardSharp,
  ellipsisVertical,
} from 'ionicons/icons';
import { Router, RouterModule } from '@angular/router';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { of, switchMap } from 'rxjs';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { ChangaOverviewCardComponent } from 'src/app/shared/components/changa-overview-card/changa-overview-card.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    ChangaOverviewCardComponent,
    CustomerOverviewComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    RouterModule,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonThumbnail,
    IonSegment,
    IonSegmentButton,
    IonButtons,
    IonPopover,
    IonButton,
    IonSpinner,
  ],
})
export class ProfilePage implements OnInit, OnDestroy {
  customer!: Customer;
  posts: ChangaOverview[] = [];
  subscription: any;
  loaded = false;

  constructor(
    private authService: AuthService,
    private customerService: CustomersService,
    private router: Router
  ) {
    addIcons({ logOut, create, chevronForwardSharp, ellipsisVertical });
  }

  ngOnInit() {
    this.initializeProfile();
  }

  private initializeProfile() {
    this.subscription = this.authService
      .getUserAuthenticated()
      .pipe(
        switchMap((customer) => {
          if (customer) {
            this.customer = customer;
            return this.customerService.getPostFromCustomer(customer.id);
          }
          console.error('No authenticated user found.');
          return of({});
        })
      )
      .subscribe((response: any) => {
        this.posts = response.data;
        this.loaded = true;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.signout();
    this.router.navigate(['/home']);
  }
}
