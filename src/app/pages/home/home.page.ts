import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChangaOverviewCardComponent } from 'src/app/shared/components/changa-overview-card/changa-overview-card.component';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { ChangasService } from 'src/app/core/services/changas/changas.service';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonCardContent,
  IonCard,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonAvatar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { RouterModule } from '@angular/router';
import { search } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    IonRefresher,
    IonRefresherContent,
    ChangaOverviewCardComponent,
    IonSpinner,
    IonAvatar,
  ],
})
export class HomePage extends BaseComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  changas: ChangaOverview[] = [];
  loaded = false;

  constructor(private changasSerivce: ChangasService) {
    super();
    addIcons({ search });
  }

  ngOnInit() {
    this.loadChangas();
  }

  private loadChangas() {
    this.subscription = this.changasSerivce.getAllChangas().subscribe({
      next: (response: ApiResponse<ChangaOverview[]>) => {
        if (response.success) {
          this.changas = response.data;
          this.loaded = true;
        } else {
          console.error(response.error?.message);
        }
      },
      error: (e) => {
        this.presentErrorToast('Error requesting data');
        console.error('Error requesting data: ', JSON.stringify(e, null, 2));
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  doRefresh(event: any) {
    this.subscription.unsubscribe();
    this.loaded = false;
    this.loadChangas();
    event.target.complete();
  }
}
