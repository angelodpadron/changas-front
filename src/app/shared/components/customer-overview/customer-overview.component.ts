import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonAvatar, IonItem, IonLabel } from '@ionic/angular/standalone';
import { Customer } from 'src/app/core/models/customer/customer.model';

@Component({
  selector: 'app-customer-overview',
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.component.scss'],
  standalone: true,
  imports: [IonItem, IonAvatar, IonLabel, RouterModule],
})
export class CustomerOverviewComponent {
  @Input() customer: Customer | null = null;

  constructor() {}
}
