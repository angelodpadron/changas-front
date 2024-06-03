import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InquiryService } from 'src/app/core/services/questions/question.service';
import { BaseComponent } from 'src/app/pages/base-component';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { CreateQuestionRequest } from 'src/app/core/models/question/create-question-request';
import { Inquiry } from 'src/app/core/models/question/inquiry';
import { CommonModule } from '@angular/common';

import {
  IonInput,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class QuestionComponent extends BaseComponent implements OnInit {
  @Input() changaId!: string;

  form!: FormGroup;
  inquiry!: Inquiry;
  currentCustomer!: Customer;
  inquiries: Inquiry[] = [];
  subscription!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: InquiryService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.getUserAuthenticated();
    this.initializeForm();
    this.loadQueries();
  }

  private getUserAuthenticated() {
    this.authService.getUserAuthenticated().subscribe({
      next: (user) => {
        if (user) {
          this.currentCustomer = user;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private loadQueries() {
    this.subscription = this.questionService
      .getChangaInquiries(this.changaId)
      .subscribe({
        next: (response: ApiResponse<Inquiry[]>) => {
          if (response.success) {
            this.inquiries = response.data;
            console.log(response.data);
          } else {
            console.error(response.error?.message);
          }
        },
        error: (e) => console.error('Error requesting data: ', e),
      });
  }

  private initializeForm() {
    this.form = this.formBuilder.group({
      message: '',
    });
  }

  sendQuery() {
    if (!this.form.valid) {
      console.error('Query form is invalid');
      return;
    }

    const createQuestionRequest: CreateQuestionRequest = {
      changa_id: this.changaId,
      question: this.form.value['message'],
    };

    this.questionService.postQuestion(createQuestionRequest).subscribe({
      next: (response: ApiResponse<Inquiry>) => {
        console.log('Pregunta creada', response);
      },
      error: (error) => {
        this.presentErrorToastFromResponse(error);
        console.error('Error sending question', error);
      },
    });
  }
}
