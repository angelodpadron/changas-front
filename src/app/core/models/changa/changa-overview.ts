import { Customer } from "../customer/customer.model";

export interface ChangaOverview {
  id: string;
  title: string;
  description: string;
  photo_url: string;
  topics: string[];
  provider_summary: Customer;
  available: boolean;
}
