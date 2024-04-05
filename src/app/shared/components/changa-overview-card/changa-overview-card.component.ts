import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { ChangaOverview } from 'src/app/core/models/changa-overview.model';

@Component({
  selector: 'app-changa-overview-card',
  templateUrl: './changa-overview-card.component.html',
  styleUrls: ['./changa-overview-card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonItem,
    IonAvatar,
    IonLabel,
    IonChip,
    CommonModule,
  ],
})
export class ChangaOverviewCardComponent {
  @Input() changa!: ChangaOverview;

  constructor() {}
}
