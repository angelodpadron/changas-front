import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  standalone: true,
})
export class MapComponent implements OnInit {
  map!: L.Map;

  constructor() {}

  ngOnInit() {
    this.map = L.map('map', {
      center: [-34.7955703, -58.2912458],
      zoom: 13,
      renderer: L.canvas(),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this.map);

    let marketIcon = L.icon({
      iconUrl: 'assets/icon/marker.png', // the icon is of size 48x48
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48],
    });

    L.marker([-34.7955703, -58.2912458], {
      icon: marketIcon,
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 1000);
  }
}
