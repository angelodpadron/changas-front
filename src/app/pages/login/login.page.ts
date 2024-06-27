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
import { Router, RouterModule } from '@angular/router';
import {
  LoginRequest,
  LoginResponse,
} from 'src/app/core/models/customer/auth-request-response';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ApiResponse } from 'src/app/core/models/api-response';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
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
export class LoginPage extends BaseComponent implements OnInit {
  form!: FormGroup;
  loginRequest!: LoginRequest;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    super();
  }

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
      next: () => {
        this.showLoginToast();
        this.handleLoginRedirect();
      },
      error: (error) => {
        this.presentErrorToastFromResponse(error);
        console.error('Error attemping login', error);
      },
    });
  }

  private handleLoginRedirect() {
    const route = localStorage.getItem('redirectAfterLogin') || '/home';
    localStorage.removeItem('redirectAfterLogin');
    this.router.navigate([route]);
  }

  private showLoginToast() {
    this.presentToastWithAnchor(
      'Sesion iniciada',
      'top',
      'header',
      1000,
      'success'
    );
  }
}
