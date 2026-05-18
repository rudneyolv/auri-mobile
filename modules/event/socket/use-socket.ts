import { EventsSocketContext } from '@/modules/event/socket/socket-provider';
import { useContext } from 'react';

export function useEventsSocket() {
  const ctx = useContext(EventsSocketContext);
  if (!ctx) {
    throw new Error('useEventsSocket must be used inside EventsSocketProvider');
  }
  return ctx;
}
