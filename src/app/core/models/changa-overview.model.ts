import { User } from "./user.model";

export interface ChangaOverview {
  id: string;
  title: string;
  description: string;
  photoUrl: string;
  topics: string[];
  providerSummary: User;
}
