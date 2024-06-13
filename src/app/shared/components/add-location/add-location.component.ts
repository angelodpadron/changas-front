import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapComponent } from '../map/map.component';

import {
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from 'src/app/core/models/area/location';
import { LocationService } from 'src/app/core/services/location/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss'],
  standalone: true,
  imports: [
    MapComponent,
    IonInput,
    CommonModule,
    FormsModule,
    IonList,
    IonItem,
    IonLabel,
    IonSearchbar,
  ],
})
export class AddLocationComponent {
  @Output() onLocationAdded = new EventEmitter<Location>();
  @Input() latitude: number | null = null;
  @Input() longitude: number | null = null;

  location = '';
  matches: Location[] = [];

  constructor(private locationService: LocationService) {}

  getMatches() {
    if (!this.location.length) return;

    this.locationService.matches(this.location).subscribe({
      next: (locations: Location[]) => {
        this.matches = locations;
      },
      error: (error) => {
        console.error('Error on autocompletion:', error);
      },
    });
  }

  selectItem(item: number) {
    this.longitude = this.matches[item].coordinates[0];
    this.latitude = this.matches[item].coordinates[1];
    this.location = this.matches[item].name;
    this.matches = [];

    this.onLocationAdded.emit({
      name: this.location,
      coordinates: [this.longitude, this.latitude],
    });
  }
}
