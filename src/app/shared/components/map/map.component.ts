import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements OnInit, OnChanges {
  @Input('latitude') latitude: number = -34.7955703;
  @Input('longitude') longitude: number = -58.2912458;

  map!: L.Map;

  marketIcon = L.icon({
    iconUrl: 'assets/icon/marker.png', // the icon is of size 48x48
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });

  constructor() {}

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.map) {
      const coordinates: [number, number] = [this.latitude, this.longitude];
      this.updateMap(coordinates);
    }
  }

  ngOnInit() {
    console.log(
      'Map initialized with coordinates: ',
      this.latitude,
      this.longitude
    );

    const coordinates: [number, number] = [this.latitude, this.longitude];

    this.initializeMap(coordinates);

    // trick to fix the map size
    setTimeout(() => {
      this.map.invalidateSize();
    }, 1000);
  }

  private initializeMap(coordinates: [number, number]) {
    this.map = L.map('map', {
      center: coordinates,
      zoom: 13,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    L.marker(coordinates, {
      icon: this.marketIcon,
    }).addTo(this.map);
  }

  private updateMap(coordinates: [number, number]) {
    this.map.setView(coordinates, 13);

    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    L.marker(coordinates, {
      icon: this.marketIcon,
    }).addTo(this.map);
  }
}
