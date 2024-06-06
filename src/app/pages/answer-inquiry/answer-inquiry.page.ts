import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonTextarea,
  IonThumbnail,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { InquiryService } from 'src/app/core/services/questions/question.service';
import { Inquiry } from 'src/app/core/models/question/inquiry';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-answer-inquiry',
  templateUrl: './answer-inquiry.page.html',
  styleUrls: ['./answer-inquiry.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonTextarea,
    IonThumbnail,
    IonBackButton,
    IonButtons,
  ],
})
export class AnswerInquiryPage implements OnInit {
  @Input('id') inquiryId!: string;
  inquiry!: Inquiry;
  
  form: FormGroup = this.formBuilder.group({
    answer: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  constructor(
    private inquiryService: InquiryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (!this.inquiryId) {
      console.error('No inquiry id provided');
    }

    this.inquiryService.getInquiry(this.inquiryId).subscribe((response) => {
      this.inquiry = response.data;
    });
  }

  submitAnswer() {

    if (this.form.invalid) {
      console.error('Invalid form');
      return;
    }

    this.inquiryService
      .submitAnswer({
        question_id: this.inquiry.id,
        response: this.form.get('answer')?.value,
      })
      .subscribe((response) => {
        this.inquiry = response.data;
      });
  }
}
