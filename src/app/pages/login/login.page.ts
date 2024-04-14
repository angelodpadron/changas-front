import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonList,
  IonCardContent,
  IonCard,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import {
  LoginRequest,
  LoginResponse,
} from 'src/app/core/models/auth-request-response-body';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
    IonBackButton,
    IonButtons,
    IonList,
    IonCardContent,
    IonCard,
  ],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  loginRequest!: LoginRequest;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (!this.form.valid) {
      console.error('Login form is invalid');
      return;
    }

    this.loginRequest = this.form.value;

    this.authService.login(this.loginRequest).subscribe({
      next: (response: LoginResponse) => {
        console.log(
          'Login success. Saving access token and redirecting to home page.'
        );
        localStorage.setItem('accessToken', response.token);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Error attemping login', err),
    });
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
