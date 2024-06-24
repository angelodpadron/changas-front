import { ChangaOverview } from '../changa/changa-overview';
import { Customer } from '../customer/customer.model';

export interface Inquiry {
  id: number;
  question: string;
  answer: string;
  created_at: Date;
  last_update: Date;
  changa_id: number;
  changa: ChangaOverview;
  customer: Customer;
}
