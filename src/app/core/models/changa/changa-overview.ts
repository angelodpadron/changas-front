import { ServiceArea } from "../area/service-area";
import { Customer } from "../customer/customer.model";

export interface ChangaOverview {
  id: string;
  title: string;
  description: string;
  photo_url: string;
  topics: string[];
  provider_summary: Customer;
  service_area: ServiceArea;
  available: boolean;
  created_at: Date;
  last_update: Date;
}
