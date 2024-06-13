import {
  Component,
  Input,
  OnChanges,
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
  private readonly MAP_ID = 'map';
  private readonly MARKER_ICON_URL = 'assets/icon/marker.png';
  private readonly URL_TEMPLATE = 'https://tile.openstreetmap.de/{z}/{x}/{y}.png';
  private readonly ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  @Input('latitude') latitude!: number;
  @Input('longitude') longitude!: number;

  map!: L.Map;

  marketIcon = L.icon({
    iconUrl: this.MARKER_ICON_URL,
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
    if (!this.latitude || !this.longitude) {
      throw new Error('Latitude and longitude are required to display the map');
    }

    const coordinates: [number, number] = [this.latitude, this.longitude];

    this.initializeMap(coordinates);

    // trick to fix the map size
    setTimeout(() => {
      this.map.invalidateSize();
    }, 1000);
  }

  private initializeMap(coordinates: [number, number]) {
    this.map = L.map(this.MAP_ID, {
      center: coordinates,
      zoom: 13,
      renderer: L.canvas(),
    });

    L.tileLayer(this.URL_TEMPLATE, {
      maxZoom: 19,
      attribution: this.ATTRIBUTION,
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
