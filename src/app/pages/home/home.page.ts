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
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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

  constructor(
    private changasAPISerivce: ChangasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.changasAPISerivce.getAllChangas().subscribe({
      next: (data) => (this.changas = data),
      error: () => console.error('Error requesting data'),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  redirectToHirings() {
    this.router.navigate(['/hirings']);
    return;
  }

  signout() {
    localStorage.removeItem('accessToken');
  }
}
