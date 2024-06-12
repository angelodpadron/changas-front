import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MapComponent } from '../map/map.component';

import {
  IonInput,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

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
  ],
})
export class AddLocationComponent {
  private readonly apiKey = environment.geoapifyApiKey;

  @Output() onLocationAdded = new EventEmitter<any>();

  location = '';
  matches: { name: string; coordinates: [number, number] }[] = [];
  latitude = -34.7955703;
  longitude = -58.2912458;

  constructor() {}

  private toQueryUrl(query: string) {
    return `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${this.apiKey}`;
  }

  fetchLocations() {
    const url = this.toQueryUrl(this.location);
    this.matches = [];
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data['features'].map((feature: any) => {
          this.matches.push({
            name: feature.properties.formatted,
            coordinates: feature.geometry.coordinates,
          });
        });
      })
      .catch((error) => console.error('Error on autocompletion:', error));
  }

  selectItem(item: number) {
    this.longitude = this.matches[item].coordinates[0];
    this.latitude = this.matches[item].coordinates[1];
    this.location = this.matches[item].name;
    this.matches = [];

    const area = {
      name: this.location,
      coordinates: [this.longitude, this.latitude],
    };

    this.onLocationAdded.emit(area);
  }
}
