import { Customer } from "./customer.model";

export interface ChangaOverview {
  id: string;
  title: string;
  description: string;
  photo_url: string;
  topics: string[];
  provider_summary: Customer;
}
