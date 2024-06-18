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
  IonLabel,
} from '@ionic/angular/standalone';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { ChangasService } from 'src/app/core/services/changas/changas.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { HireChangaRequest } from 'src/app/core/models/transactions/hire-changa-request';
import { Router, RouterModule } from '@angular/router';
import { BaseComponent } from '../base-component';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';

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
    IonLabel,
  ],
})
export class CheckoutPage extends BaseComponent {
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
    private transactionService: TransactionsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
  }

  hireChanga() {
    if (this.hireForm.invalid) {
      console.error('Invalid form');
      return;
    }

    const hireRequest: HireChangaRequest = {
      changa_id: this.changaOverview()!.id,
      work_area_details: {
        description: this.hireForm.value.work_details!,
        photo_url: this.hireForm.value.work_area_photo_url!,
      },
    };

    this.hireForm.disable();

    this.transactionService.hireChanga(hireRequest).subscribe({
      next: () => {
        this.router.navigate(['/hiring-success']);
      },
      error: (error) => {
        this.presentErrorToastFromResponse(error);
        console.error(error);
      },
    });
  }
}
