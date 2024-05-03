import { Component, Input, WritableSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonBackButton,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { ChangasService } from 'src/app/core/services/changas/changas.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { HireChangaRequest } from 'src/app/core/models/transactions/hire-changa-request';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonButtons,
    IonBackButton,
    IonThumbnail,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class CheckoutPage {
  public changaOverview: WritableSignal<ChangaOverview | null> = signal(null);

  public hireForm = this.formBuilder.group({
    work_details: ['', [Validators.required, Validators.minLength(10)]],
    work_area_photo_url: ['', [Validators.required]],
  });

  @Input()
  set id(changaId: string) {
    this.changaService
      .getChangaById(changaId)
      .subscribe((response: ApiResponse<ChangaOverview>) => {
        this.changaOverview.set(response.data);
      });
  }

  constructor(
    private changaService: ChangasService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  hireChanga() {
    if (this.hireForm.invalid) {
      console.error('Invalid form');
      return;
    }

    const hireRequest: HireChangaRequest = {
      changa_id: this.changaOverview()!.id,
      work_details: this.hireForm.value.work_details!,
      work_area_photo_url: this.hireForm.value.work_area_photo_url!,
    };

    this.hireForm.disable();

    this.changaService.hireChanga(hireRequest).subscribe({
      next: () => {
        this.router.navigate(['/hiring-success']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
