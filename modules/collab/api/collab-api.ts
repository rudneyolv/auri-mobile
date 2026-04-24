import { apiRequest } from '@/api';
import {
  ReceivedCollabRequestResponse,
  RespondCollabRequestDto,
  RespondCollabRequestResponse,
  SendCollabRequestDto,
  SendCollabRequestResponse,
  SentCollabRequestResponse,
} from '@/modules/collab/types/collab-api';

export async function sendCollabRequest(dto: SendCollabRequestDto) {
  return await apiRequest<SendCollabRequestResponse>({
    endpoint: 'collab-requests',
    requiresAuth: true,
    requestConfig: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    },
  });
}

export async function getReceivedCollabRequests() {
  return await apiRequest<ReceivedCollabRequestResponse[]>({
    endpoint: 'collab-requests/received',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function getSentCollabRequests() {
  return await apiRequest<SentCollabRequestResponse[]>({
    endpoint: 'collab-requests/sent',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function respondToCollabRequest({
  requestId,
  dto,
}: {
  requestId: string;
  dto: RespondCollabRequestDto;
}) {
  return await apiRequest<RespondCollabRequestResponse>({
    endpoint: `collab-requests/${requestId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    },
  });
}

export async function cancelCollabRequest(requestId: string) {
  return await apiRequest<void>({
    endpoint: `collab-requests/${requestId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'DELETE',
    },
  });
}
