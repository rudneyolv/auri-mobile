import { supabase } from '@/common/libs/supabase/supabase';
import { registerEventHandlers } from '@/modules/event/handlers/register-handlers';
import { createEventsSocket, EventsSocket } from '@/modules/event/socket/socket-client';
import { useRouter } from 'expo-router';
import { createContext, ReactNode, useEffect, useRef } from 'react';

export const EventsSocketContext = createContext<EventsSocket | null>(null);

interface EventsSocketProviderProps {
  children: ReactNode;
}

export function EventsSocketProvider({ children }: EventsSocketProviderProps) {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const socketRef = useRef<EventsSocket | null>(null);

  useEffect(() => {
    const instance = createEventsSocket();
    socketRef.current = instance;

    // Register event handlers returns an unregister function that we can call on cleanup
    const unregisterEventHandlers = registerEventHandlers(instance, {
      onMessageTap: () => routerRef.current.push('/(tabs)/chat'),
      onCollabAcceptedTap: () => routerRef.current.push('/(tabs)/chat'),
    });

    const connectWithToken = (token: string) => {
      if (instance.connected) instance.disconnect();
      instance.auth = { token };
      instance.connect();
    };

    const { data: authSubscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.access_token) connectWithToken(session.access_token);
      } else if (event === 'SIGNED_OUT') {
        if (instance.connected) instance.disconnect();
      }
    });

    return () => {
      authSubscription.subscription.unsubscribe();
      unregisterEventHandlers();
      instance.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <EventsSocketContext.Provider value={socketRef.current}>
      {children}
    </EventsSocketContext.Provider>
  );
}
