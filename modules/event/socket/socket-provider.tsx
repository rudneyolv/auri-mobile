import { supabase } from '@/common/libs/supabase/supabase';
import { registerEventHandlers } from '@/modules/event/handlers/register-handlers';
import { createEventsSocket, EventsSocket } from '@/modules/event/socket/socket-client';
import { ServerEvents } from '@/modules/event/types/events-types';
import { useRouter } from 'expo-router';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Unsubscribe = () => void;

// Cast local: tipos do socket.io upstream usam FallbackToUntypedListener
// com conditional types e não conseguem resolver com generics propagados.
// O type-safety da nossa API pública (subscribe<K>) já está garantido pelo generic.
type RawSocketHandler = (...args: unknown[]) => void;

type UntypedSocket = {
  on: (event: string, handler: RawSocketHandler) => void;
  off: (event: string, handler: RawSocketHandler) => void;
};

function toUntypedSocket(socket: EventsSocket): UntypedSocket {
  return socket as unknown as UntypedSocket;
}

export interface EventsSocketContextValue {
  socket: EventsSocket;
  subscribe: <K extends keyof ServerEvents>(event: K, handler: ServerEvents[K]) => Unsubscribe;
  onConnect: (handler: () => void) => Unsubscribe;
}

interface EventsSocketProviderProps {
  children: ReactNode;
}

export const EventsSocketContext = createContext<EventsSocketContextValue | null>(null);

export function EventsSocketProvider({ children }: EventsSocketProviderProps) {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  // Lazy init: createEventsSocket() roda apenas no primeiro render.
  // O socket fica disponível sincronamente — qualquer filho que monte
  // junto (ex: MessagesSync) já vê a instância real no primeiro subscribe.
  const [socket] = useState<EventsSocket>(() => createEventsSocket());

  useEffect(() => {
    // Register event handlers returns an unregister function that we can call on cleanup
    const unregisterEventHandlers = registerEventHandlers(socket, {
      onCollabAcceptedTap: () => routerRef.current.push('/(tabs)/messages' as any),
    });

    const connectWithToken = (token: string) => {
      if (socket.connected) socket.disconnect();
      socket.auth = { token };
      socket.connect();
    };

    const { data: authSubscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        if (session?.access_token) connectWithToken(session.access_token);
      } else if (event === 'SIGNED_OUT') {
        if (socket.connected) socket.disconnect();
      }
    });

    return () => {
      authSubscription.subscription.unsubscribe();
      unregisterEventHandlers();
      socket.disconnect();
    };
  }, [socket]);

  const subscribe = useCallback(
    function subscribe<K extends keyof ServerEvents>(
      event: K,
      handler: ServerEvents[K],
    ): Unsubscribe {
      const untyped = toUntypedSocket(socket);
      const rawHandler = handler as RawSocketHandler;

      untyped.on(event, rawHandler);

      return function unsubscribe() {
        untyped.off(event, rawHandler);
      };
    },
    [socket],
  );

  const onConnect = useCallback(
    function onConnect(handler: () => void): Unsubscribe {
      socket.on('connect', handler);

      // Se o socket já está conectado, o evento 'connect' não dispara
      // novamente. Chamamos o handler imediatamente para que consumidores
      // que montam depois da conexão (ex: navegação para uma tela com
      // useOnConnect) ainda executem sua lógica de sync.
      if (socket.connected) handler();

      return function unsubscribe() {
        socket.off('connect', handler);
      };
    },
    [socket],
  );

  const value = useMemo<EventsSocketContextValue>(
    () => ({ socket, subscribe, onConnect }),
    [socket, subscribe, onConnect]
  );

  return <EventsSocketContext.Provider value={value}>{children}</EventsSocketContext.Provider>;
}
