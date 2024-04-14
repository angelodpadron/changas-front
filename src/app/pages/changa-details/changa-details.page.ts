import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { ChangaOverview } from 'src/app/core/models/changa-overview.model';
import { ChangasService } from 'src/app/core/services/changas.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-changa-details',
  templateUrl: './changa-details.page.html',
  styleUrls: ['./changa-details.page.scss'],
  standalone: true,
  imports: [
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
  id!: string;
  changa!: ChangaOverview;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changaService: ChangasService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id')!; // Mmm...

    const loading = await this.loadingController.create({
      message: 'Obteniendo informacion...',
    });

    await loading.present();

    this.changaService.getChangaById(this.id).subscribe({
      next: async (changa: ChangaOverview) => {
        this.changa = changa;
        await loading.dismiss(); // Dismiss the loading indicator on success
      },
      error: async (error: any) => {
        console.error('Error retrieving changa details:', error);
        await loading.dismiss(); // Dismiss the loading indicator on error
      },
    });
  }

  hireProvider(changaId: string) {

    this.changaService.hireChanga(changaId).subscribe({
      next: () => {
        this.router.navigate(['/hiring-success']);
      },
      error: (error) => {
        console.error('Error hiring changa:', error);
      },
    });
  }
}
