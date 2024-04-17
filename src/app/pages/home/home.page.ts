import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangaOverviewCardComponent } from 'src/app/shared/components/changa-overview-card/changa-overview-card.component';
import { ChangaOverview } from 'src/app/core/models/changa-overview.model';
import { ChangasService } from 'src/app/core/services/changas.service';
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
  IonLabel,
  IonItem,
  IonList,
  IonCardContent,
  IonCard,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { ApiResponse } from 'src/app/core/models/api-response-body';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCard,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
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
    MenuComponent,
  ],
})
export class HomePage implements OnInit, OnDestroy {
  private subscription!: Subscription;
  changas: ChangaOverview[] = [];

  constructor(private changasSerivce: ChangasService) {}

  ngOnInit() {
    this.subscription = this.changasSerivce.getAllChangas().subscribe({
      next: (response: ApiResponse<ChangaOverview[]>) => {
        if (response.success) {
          this.changas = response.data;
        } else {
          console.error(response.error?.message);
        }
      },
      error: (e) => console.error('Error requesting data: ', e),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
