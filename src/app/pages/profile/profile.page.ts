import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  IonBackButton,
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
import { Observable, of, switchMap } from 'rxjs';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { ChangaOverviewCardComponent } from 'src/app/shared/components/changa-overview-card/changa-overview-card.component';
import { CustomerPostsComponent } from 'src/app/shared/components/customer-posts/customer-posts.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    ChangaOverviewCardComponent,
    CustomerOverviewComponent,
    CustomerPostsComponent,
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
    IonBackButton,
  ],
})
export class ProfilePage implements OnInit, OnDestroy {
  @Input() customerId: string | null = null;

  customer!: Customer;
  subscription: any;
  isLoggedUser = false;
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

  private getCustomer(): Observable<Customer> {
    // Return the customer details as an observable
    // If a customerId is provided, use it to fetch the customer details
    // Otherwise, use the authenticated customer
    // If neither is available, throw an error
    if (this.customerId) {
      return this.customerService.getCustomerDetails(this.customerId).pipe(
        switchMap((response) => {
          return of(response.data);
        })
      );
    }

    return this.authService.getUserAuthenticated().pipe(
      switchMap((customer) => {
        if (customer) {
          this.isLoggedUser = true;
          return of(customer);
        }
        throw new Error(
          'No customer id was passed nor is there an authenticated one, therefore no customer details can be displayed.'
        );
      })
    );
  }

  private initializeProfile() {
    this.subscription = this.getCustomer()
      .subscribe({
        next: (customer) => {
          this.customer = customer;
          this.loaded = true;
        },
        error: (error) => {
          console.error('Error loading customer details', error);
        },
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
