import { Component, Input } from '@angular/core';
import { IonAvatar, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-customer-overview',
  templateUrl: './customer-overview.component.html',
  styleUrls: ['./customer-overview.component.scss'],
  standalone: true,
  imports: [IonItem, IonAvatar, IonLabel],
})
export class CustomerOverviewComponent {
  @Input() customerName: string = '';
  @Input() customerEmail: string = '';
  @Input() customerPhotoUrl: string = '';

  constructor() {}
}
