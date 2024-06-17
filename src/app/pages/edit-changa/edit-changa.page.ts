import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonTextarea,
  IonInput,
} from '@ionic/angular/standalone';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { ChangasService } from 'src/app/core/services/changas/changas.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { CreateChangaRequest } from 'src/app/core/models/changa/create-changa-request';
import { Router } from '@angular/router';
import { AddLocationComponent } from 'src/app/shared/components/add-location/add-location.component';

@Component({
  selector: 'app-edit-changa',
  templateUrl: './edit-changa.page.html',
  styleUrls: ['./edit-changa.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonTextarea,
    IonInput,
    AddLocationComponent,
  ],
})
export class EditChangaPage implements OnInit {
  @Input('id')
  changaId: string = '';
  changaOverview!: ChangaOverview;

  editForm!: FormGroup;
  loaded = false;

  constructor(
    private changaService: ChangasService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadChangaOverview();
  }

  private loadChangaOverview() {
    this.changaService.getChangaById(this.changaId).subscribe({
      next: (response: ApiResponse<ChangaOverview>) => {
        if (!response.success) {
          console.error(response.error);
          return;
        }
        this.changaOverview = response.data;
        this.loaded = true;

        this.buildForm();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  private buildForm() {
    this.editForm = this.formBuilder.group({
      title: [
        this.changaOverview.title,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z0-9\s]*$/),
        ],
      ],
      description: [
        this.changaOverview.description,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      photo_url: [
        this.changaOverview.photo_url,
        [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)],
      ],
      service_area: [this.changaOverview.service_area, [Validators.required]],
      topics: [
        this.changaOverview.topics,
        [Validators.pattern('^$|^[\\w\\s]+(,[\\w\\s]+)*$')],
      ],
    });
  }

  editChanga() {
    if (!this.editForm.valid) {
      console.error('Invalid form');
      return;
    }

    this.editForm.disable();

    const editRequest: CreateChangaRequest = {
      ...this.editForm.value,
      topics: this.editForm.value.topics
        .split(',')
        .map((topic: string) => topic.trim()),
    };

    this.changaService.editChanga(this.changaId, editRequest).subscribe({
      next: (response: ApiResponse<ChangaOverview>) => {
        if (!response.success) {
          console.error(response.error);
          return;
        }
        this.router.navigate(['/changa-details', this.changaId]);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}
