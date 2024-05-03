import { Component, OnInit } from '@angular/core';
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
  IonButton,
  IonButtons,
  IonBackButton,
  IonCol,
  IonRow,
  IonLabel,
  IonItem,
  IonList,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonInput,
  IonText,
  IonTextarea,
} from '@ionic/angular/standalone';
import { CreateChangaRequest } from 'src/app/core/models/changa/create-changa-request';
import { ChangasService } from 'src/app/core/services/changas/changas.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { ChangaOverview } from 'src/app/core/models/changa/changa-overview';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-changa',
  templateUrl: './create-changa.page.html',
  styleUrls: ['./create-changa.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCol,
    IonRow,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonInput,
    IonText,
    IonTextarea,
  ],
})
export class CreateChangaPage implements OnInit {
  form!: FormGroup;
  createChangaRequest!: CreateChangaRequest;

  constructor(
    private changasService: ChangasService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.pattern(/^[a-zA-Z0-9\s]*$/),
        ],
      ],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      photo_url: [
        null,
        [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)],
      ],
      topics: [null, [Validators.pattern('^$|^[\\w\\s]+(,[\\w\\s]+)*$')]],
    });
  }

  createChanga() {
    if (this.form.invalid) {
      console.error('Invalid form');
      return;
    }

    this.createChangaRequest = {
      ...this.form.value,
      topics: this.form.value.topics
        .split(',')
        .map((topic: string) => topic.trim()),
    };

    this.changasService.createChanga(this.createChangaRequest).subscribe({
      next: (response: ApiResponse<ChangaOverview>) => {
        console.log('Changa created', response);
        this.form.disable();
        this.router.navigate(['/changa-details/' + response.data.id]);
      },
      error: (error) => {
        console.error('Error creating changa', error);
      },
    });
  }
}
