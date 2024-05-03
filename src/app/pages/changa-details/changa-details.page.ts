import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { ChangasService } from 'src/app/core/services/changas/changas.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { switchMap, of, catchError } from 'rxjs';
import { CustomerOverviewComponent } from 'src/app/shared/components/customer-overview/customer-overview.component';

@Component({
  selector: 'app-changa-details',
  templateUrl: './changa-details.page.html',
  styleUrls: ['./changa-details.page.scss'],
  standalone: true,
  imports: [
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonBackButton,
    IonButtons,
    IonButton,
    IonChip,
    IonLabel,
    IonAvatar,
    IonItem,
    IonImg,
    IonIcon,
    IonSpinner,
    CustomerOverviewComponent,
  ],
})
export class ChangaDetailsPage implements OnInit {
  @Input('id')
  changaId: string = '';
  changaOverview!: ChangaOverview;
  blocked = false;
  loaded = false;

  constructor(
    private changaService: ChangasService,
    private authService: AuthService,
  ) {}

  async ngOnInit() {
    this.changaService
      .getChangaById(this.changaId)
      .pipe(
        switchMap((response: ApiResponse<ChangaOverview>) => {
          if (response.success) {
            this.changaOverview = response.data;
            // Return another observable here
            return this.authService.getUserAuthenticated().pipe(
              switchMap((user) => {
                if (user?.id === this.changaOverview.provider_summary.id) {
                  this.blocked = true;
                }
                return of({}); // Completes the observable chain successfully
              })
            );
          } else {
            console.error(response.error?.message);
            return of({}); // Return an empty observable to complete the chain
          }
        }),
        catchError((error) => {
          console.error('Error retrieving changa details:', error);
          return of({}); // Handle errors and complete the chain
        })
      )
      .subscribe({
        next: async () => {
          this.loaded = true;
        },
        error: async (error) => {
          console.error('Error in the full observable chain:', error);
        },
      });
  }
}
