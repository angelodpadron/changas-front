import { ProviderProposal } from "./provider-proposal";
import { WorkAreaDetails } from "./work-area-details";

export interface HiringDetails {
  id: string;
  changa_id: string;
  provider_id: string;
  customer_id: string;
  changa_title: string;
  changa_description: string;
  changa_photo_url: string;
  created_at: Date;
  last_update: Date;
  work_area_details: WorkAreaDetails;
  provider_proposal: ProviderProposal;
  status: string;
}
