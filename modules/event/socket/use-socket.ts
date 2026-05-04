import { EventsSocketContext } from '@/modules/event/socket/socket-provider';
import { useContext } from 'react';

export function useEventsSocket() {
  return useContext(EventsSocketContext);
}
