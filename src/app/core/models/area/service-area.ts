export interface ServiceArea {
  name: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
}
