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
} from '@ionic/angular/standalone';
import { SignupRequest } from 'src/app/core/models/customer/auth-request-response';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
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
  ],
})
export class SignupPage extends BaseComponent implements OnInit {
  form!: FormGroup;

  signupRequest!: SignupRequest;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]*$/),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      photo_url: [null],
    });
  }

  signup() {
    if (!this.form.valid) {
      console.error('Signup form is invalid');
      return;
    }

    this.signupRequest = this.form.value;

    this.authService.signup(this.signupRequest).subscribe({
      next: () => {
        this.presentToast('Usuario creado', 2000, 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.presentErrorToastFromResponse(error, 5000);
      },
    });
  }
}
