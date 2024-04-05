import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangaOverviewCardComponent } from 'src/app/shared/components/changa-overview-card/changa-overview-card.component';
import { ChangaOverview } from 'src/app/core/models/changa-overview.model';
import { ChangasAPIService } from 'src/app/core/services/changas-api.service';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenu,
  IonMenuButton,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonMenu,
    IonSearchbar,
    ChangaOverviewCardComponent,
    CommonModule,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  private subscription!: Subscription;
  changas: ChangaOverview[] = [];

  constructor(private changasAPISerivce: ChangasAPIService) {}

  ngOnInit() {
    this.subscription = this.changasAPISerivce.getAllChangas().subscribe({
      next: (data) => (this.changas = data),
      error: () => console.error('Error requesting data'),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
