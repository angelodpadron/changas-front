export interface ServiceArea {
  name: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}
