import { useLatestRef } from '@/common/hooks/use-latest-ref';
import { useEventsSocket } from '@/modules/event/socket/use-socket';
import { ServerEvents } from '@/modules/event/types/events-types';
import { useEffect } from 'react';

/**
 * Por que existe o `useLatestRef` aqui em vez de usar o handler direto:
 *
 * O handler vindo do caller geralmente é uma função inline (arrow function),
 * que é recriada a cada render do componente/hook que chama. Se passássemos
 * esse handler direto pro `subscribe`, todo render dispararia
 * unsubscribe + subscribe no socket — desperdício, e cria uma janela de
 * microssegundos em que o socket fica sem listener, podendo perder eventos
 * que chegam exatamente nesse instante.
 *
 * Solução: o socket recebe um listener estável (`delegateToLatestHandler`)
 * que apenas redireciona pro handler atual via ref. Quando o caller passa
 * uma função nova, atualizamos só a ref — o socket nem percebe.
 *
 * TODO: ao subir o React para 19.2+, trocar `useLatestRef` por `useEffectEvent`
 * (API oficial estável a partir do 19.2). A assinatura ficaria mais simples:
 *
 *   const onEvent = useEffectEvent(handler);
 *   useEffect(() => subscribe(event, onEvent as ServerEvents[K]), [event, subscribe]);
 */
export function useOnEvent<K extends keyof ServerEvents>(
  event: K,
  handler: (payload: Parameters<ServerEvents[K]>[0]) => void
) {
  const { subscribe } = useEventsSocket();
  const latestHandler = useLatestRef(handler);

  useEffect(() => {
    type Payload = Parameters<ServerEvents[K]>[0];

    function delegateToLatestHandler(payload: Payload) {
      latestHandler.current(payload);
    }

    // Cast necessário: TS não prova que (payload: Payload) => void
    // é assinável a ServerEvents[K] enquanto K é genérico.
    return subscribe(event, delegateToLatestHandler as ServerEvents[K]);
  }, [event, subscribe, latestHandler]);
}

export function useOnConnect(handler: () => void) {
  const { onConnect } = useEventsSocket();
  const latestHandler = useLatestRef(handler);

  useEffect(() => {
    function delegateToLatestHandler() {
      latestHandler.current();
    }

    return onConnect(delegateToLatestHandler);
  }, [onConnect, latestHandler]);
}
