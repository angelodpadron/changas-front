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
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BaseComponent } from '../base-component';
import { UpdateCustomerRequest } from 'src/app/core/models/customer/update-customer-request';
import { ApiResponse } from 'src/app/core/models/api-response';

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
export class EditProfilePage extends BaseComponent implements OnInit {
  currentCustomer!: Customer;
  editForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private customerService: CustomersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.getUserAuthenticated();
    this.initializeForm();
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

  private initializeForm() {
    this.editForm = this.formBuilder.group({
      name: [
        this.currentCustomer?.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]*$/),
        ],
      ],
      photo_url: [this.currentCustomer.photo_url, [Validators.required]],
    });
  }

  updateChanges() {
    if (!this.editForm.valid) {
      console.error('Update profile form is invalid');
      return;
    }

    const updateCustomerRequest: UpdateCustomerRequest = { ...this.editForm.value };

    this.customerService.updateCustomer(updateCustomerRequest).subscribe({
      next: (response: ApiResponse<Customer>) => {
        this.authService.updateUserAuthenticated(response.data);
        this.router.navigate(['/profile']);
        this.presentToastWithAnchor(
          'Datos de perfil actualizados',
          'top',
          'header',
          2000,
          'success'
        );
      },
      error: (error) => {
        console.error('Error updating profile', error);
        this.presentErrorToastFromResponse(error);
      },
    });
  }
}
