import { ApiError } from '@/api';
import {
  cancelCollabRequest,
  getReceivedCollabRequests,
  getSentCollabRequests,
  respondToCollabRequest,
  sendCollabRequest,
} from '@/modules/collab/api/collab-api';
import {
  ReceivedCollabRequestResponse,
  RespondCollabRequestDto,
  RespondCollabRequestResponse,
  SendCollabRequestDto,
  SendCollabRequestResponse,
  SentCollabRequestResponse,
} from '@/modules/collab/types/collab-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useSendCollabRequest() {
  const qc = useQueryClient();

  return useMutation<SendCollabRequestResponse, ApiError, SendCollabRequestDto>({
    mutationFn: sendCollabRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['discovery-users'] });
      qc.invalidateQueries({ queryKey: ['collab'] });
    },
  });
}

export function useReceivedCollabRequests() {
  return useQuery<ReceivedCollabRequestResponse[], ApiError>({
    queryKey: ['collab', 'received'],
    queryFn: getReceivedCollabRequests,
  });
}

export function useSentCollabRequests() {
  return useQuery<SentCollabRequestResponse[], ApiError>({
    queryKey: ['collab', 'sent'],
    queryFn: getSentCollabRequests,
  });
}

export function useRespondToCollabRequest() {
  const qc = useQueryClient();

  return useMutation<
    RespondCollabRequestResponse,
    ApiError,
    { requestId: string; dto: RespondCollabRequestDto }
  >({
    mutationFn: respondToCollabRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['collab'] });
      qc.invalidateQueries({ queryKey: ['discovery-users'] });
    },
  });
}

export function useCancelCollabRequest() {
  const qc = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: cancelCollabRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['collab'] });
      qc.invalidateQueries({ queryKey: ['discovery-users'] });
    },
  });
}
