import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonCardContent, IonCard, IonButton} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Customer } from 'src/app/core/models/customer/customer.model';
import { CustomersService } from 'src/app/core/services/customers/customers.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { Injectable } from '@angular/core';
import { MenuComponent } from 'src/app/shared/components/menu/menu.component';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonItem, IonList, IonCardContent, IonCard, IonButton, ReactiveFormsModule]
})
export class ProfilePage implements OnInit {
  userAuthenticated: Customer | null = null;
  form!: FormGroup;
  updateCustomerRequest! : Customer

  constructor(
    private authService: AuthService,
    private customerService: CustomersService,
    private formBuilder: FormBuilder,
    private router: Router
    )
    {
    }

  ngOnInit() {

    this.getUserAuthenticated();

    this.form = this.formBuilder.group({
      id:[this.userAuthenticated?.id],
      name: [
        this.userAuthenticated?.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9]*$/),
        ],
      ],
      email:[
        this.userAuthenticated?.email,
        [Validators.required, Validators.email],
      ],
      photo_url: [null],
    });
  }

  getUserAuthenticated(){
    this.authService.getUserAuthenticated()
    .subscribe({
      next: (user) => {
        this.userAuthenticated = user;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateChanges(){

    if (!this.form.valid) {
      console.error('Update profile form is invalid');
      return;
    }

    this.updateCustomerRequest = this.form.value;


    this.customerService.updateCustomer(this.updateCustomerRequest).subscribe({
      next: (response:ApiResponse<Customer>) => {
          console.log('Save Changed!', response);

          this.router.navigate(['/home']);
        },
      error: (err) => console.error('Error update profile', err),
    });  
  }

}
