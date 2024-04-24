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
} from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { ChangaOverview } from 'src/app/core/models/changa-overview.model';
import { ChangasService } from 'src/app/core/services/changas.service';
import { LoadingController } from '@ionic/angular';
import { ApiResponse } from 'src/app/core/models/api-response-body';
import { AuthService } from 'src/app/core/services/auth.service';
import { switchMap, of, catchError } from 'rxjs';

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
  ],
})
export class ChangaDetailsPage implements OnInit {
  @Input('id')
  changaId: string = '';
  changaOverview!: ChangaOverview;
  blocked = false;

  constructor(
    private router: Router,
    private changaService: ChangasService,
    private authService: AuthService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Obteniendo informacion...',
    });

    await loading.present();

    this.changaService
      .getChangaById(this.changaId)
      .pipe(
        switchMap((response: ApiResponse<ChangaOverview>) => {
          if (response.success) {
            this.changaOverview = response.data;
            // Return another observable here
            return this.authService.getUserAuthenticated().pipe(
              switchMap((user) => {
                if (user?.id === this.changaOverview.providerSummary.id) {
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
          await loading.dismiss(); // Dismiss the loading indicator once everything is complete
        },
        error: async (error) => {
          console.error('Error in the full observable chain:', error);
          await loading.dismiss(); // Dismiss the loading indicator on error
        },
      });
  }

  hireProvider(changaId: string) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/checkout', changaId]);
  }
}
