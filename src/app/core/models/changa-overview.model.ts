import { User } from "./user.model";

export interface ChangaOverview {
  id: string;
  title: string;
  overview: string;
  description: string;
  photoUrl: string;
  topics: string[];
  provider: User;
}
