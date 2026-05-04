import { ENV } from '@/config/env';
import { ServerEvents } from '@/modules/event/types/events-types';
import { io, Socket } from 'socket.io-client';

export type EventsSocket = Socket<ServerEvents>;

export function createEventsSocket(): EventsSocket {
  return io(`${ENV.EXPO_PUBLIC_API_URL}/events`, {
    transports: ['websocket'],
    autoConnect: false,
    auth: {},
  });
}
