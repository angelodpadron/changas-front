import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';
import { UpdateCustomerRequest } from 'src/app/core/models/customer/update-customer-request';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
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
export class ProfilePage implements OnInit {
  userAuthenticated: Customer | null = null;
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
      name: [
        this.userAuthenticated?.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]*$/),
        ],
      ],
      photo_url: [null],
    });
  }

  getUserAuthenticated() {
    this.authService.getUserAuthenticated().subscribe({
      next: (user) => {
        this.userAuthenticated = user;
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

    const updateCustomerRequest: UpdateCustomerRequest = {
      name: this.form.get('name')?.value,
      photo_url: this.form.get('photo_url')?.value,
    };

    this.customerService.updateCustomer(updateCustomerRequest).subscribe({
      next: (response: ApiResponse<Customer>) => {
        if (response.success) {
          this.router.navigate(['/home']);
          return;
        }

        console.error('Error updating profile', response.error?.message);
      },
      error: (err) => console.error('Error updating profile', err),
    });
  }
}
