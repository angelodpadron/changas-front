import { Component, HostListener } from '@angular/core';
import { MapComponent } from '../map/map.component';

import {
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: AddLocationComponent,
    },
  ],
})
export class AddLocationComponent implements ControlValueAccessor {
  onChange: OnChangeFn<Location> = () => {};
  onTouch: OnTouchedFn = () => {};

  location: Location = {
    name: '',
    coordinates: [0, 0],
  };

  matches: Location[] = [];

  disabled = false;

  constructor(private locationService: LocationService) {}

  getMatches() {
    if (!this.location.name) return;

    this.locationService.matches(this.location.name).subscribe({
      next: (locations: Location[]) => {
        this.matches = locations;
      },
      error: (error) => {
        console.error('Error on autocompletion:', error);
      },
    });
  }

  selectItem(item: number) {
    this.location = this.matches[item];
    this.matches = [];
    this.onChange(this.location);
  }

  // control value accessor

  writeValue(location: Location): void {
    if (!location) return;
    this.location = location;
  }

  registerOnChange(fn: OnChangeFn<Location>): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedFn): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @HostListener('focusout')
  onFocusOut() {
    this.onTouch();
  }
}

type OnChangeFn<T> = (value: T) => void;
type OnTouchedFn = () => void;
