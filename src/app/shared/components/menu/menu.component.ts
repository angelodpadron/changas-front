import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  IonMenu,
  IonAvatar,
  IonItem,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonMenu,
    IonAvatar,
    IonItem,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
  ],
})
export class MenuComponent implements OnInit {
  userAuthenticated: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    try {
      this.userAuthenticated = this.authService.getUserAuthenticated();
      console.log(this.userAuthenticated);
    } catch (e) {
      console.log('No user authenticated');
    }
  }

  toHirings() {
    this.router.navigate(['/hirings']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  signout() {
    this.authService.signout();
  }
}
