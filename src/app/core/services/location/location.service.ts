import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceArea } from '../../models/area/service-area';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly apiKey = environment.geoapifyApiKey;
  private readonly baseUrl = environment.geoapifyUrl;

  constructor(private http: HttpClient) {}

  private toQueryUrl(query: string) {
    return `${this.baseUrl}?text=${query}&apiKey=${this.apiKey}&filter=countrycode:ar&limit=5&lang=es`;
  }

  matches(query: string): Observable<ServiceArea[]> {
    const url = this.toQueryUrl(query);
    return this.http.get(url).pipe(
      map((response: any) =>
        response.features.map((feature: any) => ({
          name: feature.properties.formatted,
          geometry: {
            type: feature.geometry.type,
            coordinates: feature.geometry.coordinates,
          }
        }))
      )
    );
  }
}
