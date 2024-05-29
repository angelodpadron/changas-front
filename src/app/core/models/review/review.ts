import { Customer } from "../customer/customer.model";

export interface Review {
    rating: number;
    comment: string;
    photo_url: string;
    reviewer: Customer;
    created_at: Date;
}