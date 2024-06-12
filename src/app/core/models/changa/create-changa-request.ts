export interface CreateChangaRequest {
  title: string;
  description: string;
  photo_url: string;
  topics: string[];
  service_area: {
    name: string;
    coordinates: number[];
  };
}
