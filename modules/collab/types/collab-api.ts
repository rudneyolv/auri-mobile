import { CollabProfilePreview, CollabRequestStatus } from '@/modules/collab/types/collab-entity';

export interface SendCollabRequestDto {
  to_user_id: string;
}

export interface RespondCollabRequestDto {
  action: 'accept' | 'decline';
}

export interface SendCollabRequestResponse {
  request_id: string;
  status: Extract<CollabRequestStatus, 'pending'>;
  created_at: string;
}

export interface RespondCollabRequestResponse {
  request_id: string;
  status: CollabRequestStatus;
  updated_at: string;
  declined_at?: string | null;
}

export interface ReceivedCollabRequestResponse {
  request_id: string;
  created_at: string;
  from_user: CollabProfilePreview;
}

export interface SentCollabRequestResponse {
  request_id: string;
  status: Extract<CollabRequestStatus, 'pending' | 'accepted'>;
  created_at: string;
  accepted_at: string | null;
  to_user: CollabProfilePreview;
}
