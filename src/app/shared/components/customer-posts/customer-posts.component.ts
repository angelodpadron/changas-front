import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { ChangaOverviewCardComponent } from '../changa-overview-card/changa-overview-card.component';

import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-customer-posts',
  templateUrl: './customer-posts.component.html',
  styleUrls: ['./customer-posts.component.scss'],
  standalone: true,
  imports: [ChangaOverviewCardComponent, IonSpinner],
})
export class CustomerPostsComponent  implements OnInit, OnDestroy {
  @Input() customerId: number | null = null;
  posts: ChangaOverview[] = []
  loaded = false;
  subscription: any;

  constructor(private customerService: CustomersService) { }

  ngOnInit() {
    if (!this.customerId) {
      throw new Error('customer id is required in order to load posts');
    }

    this.subscription = this.customerService.getPostFromCustomer(this.customerId).subscribe({
      next: (response) => {
        this.posts = response.data;
        this.loaded = true;
      },
      error: (error) => {
        console.error('Error loading posts', error);
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
