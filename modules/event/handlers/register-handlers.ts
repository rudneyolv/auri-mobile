import type { EventsSocket } from '@/modules/event/socket/socket-client';
import { CollabAcceptedToast } from '@/modules/event/toasts/collab-accepted-toast';
import React from 'react';
import { toast } from 'sonner-native';

interface EventHandlers {
  onCollabAcceptedTap: () => void;
}

export function registerEventHandlers(socket: EventsSocket, handlers: EventHandlers) {
  socket.on('collab:accepted', (payload) => {
    toast.custom(
      React.createElement(CollabAcceptedToast, {
        payload,
        onPress: handlers.onCollabAcceptedTap,
      })
    );
  });

  return () => {
    socket.off('collab:accepted');
  };
}
