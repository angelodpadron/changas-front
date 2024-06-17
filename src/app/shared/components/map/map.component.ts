import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements OnInit, OnDestroy, OnChanges {
  private readonly TILE =
    'https://tile.openstreetmap.de/{z}/{x}/{y}.png';
  private readonly ATTRIBUTION =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

  @Input('latitude') latitude!: number;
  @Input('longitude') longitude!: number;
  @ViewChild('map', { static: true }) mapContainer: any;

  map: L.Map | null = null;

  marketIcon = L.icon({
    iconUrl: 'assets/icon/marker.png',
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });

  constructor() {}

  ngOnInit() {
    this.initializeMap();
  }

  ngOnDestroy(): void {
    this.removeMap();
  }

  ngOnChanges(_changes: SimpleChanges): void {
    if (this.map) {
      this.updateMap();
    }
  }

  private initializeMap() {
    if (!this.latitude || !this.longitude) {
      throw new Error('Latitude and longitude are required to display the map');
    }

    const coordinates: [number, number] = [this.latitude, this.longitude];

    this.map = L.map(this.mapContainer.nativeElement, {
      center: coordinates,
      zoom: 13,
      renderer: L.canvas(),
    });

    L.tileLayer(this.TILE, {
      maxZoom: 19,
      attribution: this.ATTRIBUTION,
    }).addTo(this.map);

    L.marker(coordinates, {
      icon: this.marketIcon,
    }).addTo(this.map);

    setTimeout(() => {
      this.map!.invalidateSize();
    }, 1000);
  }

  private updateMap() {
    const coordinates: [number, number] = [this.latitude, this.longitude];

    if (this.map) {
      this.map.setView(coordinates, 13);

      this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          this.map!.removeLayer(layer);
        }
      });

      L.marker(coordinates, {
        icon: this.marketIcon,
      }).addTo(this.map);
    }
  }

  private removeMap() {
    if (this.map) {
      this.map.remove();
    }
  }
}
