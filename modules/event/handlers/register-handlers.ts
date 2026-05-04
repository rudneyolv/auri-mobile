import type { EventsSocket } from '@/modules/event/socket/socket-client';
import { CollabAcceptedToast } from '@/modules/event/toasts/collab-accepted-toast';
import { MessageNotificationToast } from '@/modules/event/toasts/message-notification-toast';
import React from 'react';
import { toast } from 'sonner-native';

interface EventHandlers {
  onMessageTap: () => void;
  onCollabAcceptedTap: () => void;
}

export function registerEventHandlers(socket: EventsSocket, handlers: EventHandlers) {
  socket.on('notification:message', (payload) => {
    toast.custom(
      React.createElement(MessageNotificationToast, {
        payload,
        onPress: handlers.onMessageTap,
      })
    );
  });

  socket.on('collab:accepted', (payload) => {
    toast.custom(
      React.createElement(CollabAcceptedToast, {
        payload,
        onPress: handlers.onCollabAcceptedTap,
      })
    );
  });

  return () => {
    socket.off('notification:message');
    socket.off('collab:accepted');
  };
}
