import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

import { star, starOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { IonIcon, IonCol, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss'],
  standalone: true,
  imports: [IonIcon, IonCol, IonRow],
})
export class StarsComponent implements OnInit {
  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Input() large: boolean = false;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  
  stars: boolean[] = [];  

  constructor() {
    addIcons({ star, starOutline });
  }
  ngOnInit(): void {
    this.updateStars();
  }

  private updateStars() {
    this.stars = Array(5)
      .fill(false)
      .map((_, i) => i < this.rating);
  }

  onStarClick(rating: number) {
    if (this.readonly) return;
    this.rating = rating;
    this.updateStars();
    this.ratingChange.emit(this.rating);
  }
}
