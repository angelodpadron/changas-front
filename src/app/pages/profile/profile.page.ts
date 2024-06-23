import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonIcon,
  IonLabel,
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
import { Observable, of, switchMap } from 'rxjs';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { CustomerPostsComponent } from 'src/app/shared/components/customer-posts/customer-posts.component';
import { CustomerSummaryComponent } from 'src/app/shared/components/customer-summary/customer-summary.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    CustomerOverviewComponent,
    CustomerPostsComponent,
    CustomerSummaryComponent,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonIcon,
    IonLabel,
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
  segment: 'posts' | 'summary' = 'posts';

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

  segmentChanged(event: CustomEvent) {
    this.segment = event.detail.value as 'posts' | 'summary';
  }

}
