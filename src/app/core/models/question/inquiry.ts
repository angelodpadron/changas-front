import { Customer } from '../customer/customer.model';

export interface Inquiry {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  changa_id: number;
  customer: Customer;
}
