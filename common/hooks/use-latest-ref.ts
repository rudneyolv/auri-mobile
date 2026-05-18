import { useEffect, useRef } from 'react';

/**
 * Retorna uma ref cujo `.current` é sempre atualizado com o valor mais recente
 * recebido em cada render. Útil em listeners, timers ou closures que precisam
 * de identidade estável mas ainda assim devem executar a versão atual de um
 * callback / valor (sem causar re-subscribe a cada render do caller).
 *
 * TODO: ao subir o React para 19.2+, este hook deve ser removido e os callers
 * devem migrar para `useEffectEvent` (API oficial estável a partir do 19.2).
 * Hoje (React 19.1) não dá — `useEffectEvent` só existe no canal canary.
 */
export function useLatestRef<T>(value: T) {
  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref;
}
