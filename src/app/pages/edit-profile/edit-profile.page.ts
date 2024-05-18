import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonList,
  IonCardContent,
  IonCard,
  IonButton,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonList,
    IonCardContent,
    IonCard,
    IonButton,
    IonButtons,
    IonBackButton,
  ],
})
export class EditProfilePage implements OnInit {
  userAuthenticated!: Customer;
  form!: FormGroup;

  photoUrlDefault = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  constructor(
    private authService: AuthService,
    private customerService: CustomersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserAuthenticated();

    this.form = this.formBuilder.group({
      id: this.userAuthenticated.id,
      name: [
        this.userAuthenticated?.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]*$/),
        ],
      ],
      email: this.userAuthenticated.email,
      photo_url: this.userAuthenticated.photo_url,
    });
  }

  getUserAuthenticated() {
    this.authService.getUserAuthenticated().subscribe({
      next: (user) => {
        if (user) {
          this.userAuthenticated = user;
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateChanges() {
    if (!this.form.valid) {
      console.error('Update profile form is invalid');
      return;
    }

    const updateCustomer = this.form.value;
    this.customerService.updateCustomer(updateCustomer).subscribe({
      next: (response: ApiResponse<Customer>) => {
        if (response.success) {
          this.authService.updateUserAuthenticated(updateCustomer);
          this.router.navigate(['/profile']);
          return;
        }

        console.error('Error updating profile', response.error?.message);
      },
      error: (err) => console.error('Error updating profile', err),
    });
  }
}
