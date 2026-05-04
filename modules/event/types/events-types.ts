import { CollabAcceptedPayload, MessageNotificationPayload } from '@/modules/event/payloads';

// Map of server -> client events. Mirrors the backend ServerEvents map.
export interface ServerEvents {
  'notification:message': (payload: MessageNotificationPayload) => void;
  'collab:accepted': (payload: CollabAcceptedPayload) => void;
}

export type ServerEventName = keyof ServerEvents;
