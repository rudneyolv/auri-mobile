'use client';

import { Capability } from '@/common/capability/types/capability-types';
import { useEffect } from 'react';

/**
 * useCapabilityEffect
 *
 * Este hook é um "Vigilante de Restrições" (Constraint Enforcement).
 * Ele monitora o estado de uma Capability e garante que o valor de um campo
 * (ou estado) permaneça íntegro de acordo com as regras de negócio.
 *
 * Fluxo de Funcionamento:
 * 1. O hook observa a Capability fornecida.
 * 2. Se a Capability estiver carregada (!isLoading) e desabilitada (enabled: false)...
 * 3. ...e possuir um valor de imposição (forceValueOnDisable)...
 * 4. O hook compara esse valor com o `value` atual.
 * 5. Caso haja inconsistência, o callback `onEnforce` é disparado para sincronizar o estado.
 *
 * Por que usar:
 * - Evita "Estados Impossíveis": Ex: Um usuário ter acesso "Pago" selecionado, mas não ter conta Stripe.
 * - Desacoplamento: O hook não sabe nada sobre formulários; ele apenas dita a regra de sincronia.
 * - UX Reativa: O campo se auto-ajusta assim que as permissões terminam de carregar em background.
 *
 * @template T - O tipo do valor que está sendo monitorado/sincronizado.
 * @param {Capability.Entity<T>} data.capability - Objeto de capability que dita a regra.
 * @param {T} data.value - O valor atual do estado/campo (ex: via useWatch).
 * @param {(forcedValue: T) => void} data.onEnforce - Ação a ser tomada quando a regra é violada (ex: form.setValue).
 */
export function useCapabilityEffect<T>(data: {
  capability?: Capability<T>;
  value: T;
  onEnforce: (forcedValue: T) => void;
}) {
  const { capability, value, onEnforce } = data;

  useEffect(() => {
    if (!capability || capability.forceValueOnDisable === undefined) return;

    const isLocked = !capability.isLoading && capability.enabled === false;

    const forcedValue = capability.forceValueOnDisable as T;
    const needsSync = value !== forcedValue;

    if (isLocked && needsSync) {
      onEnforce(forcedValue);
    }
  }, [capability, value, onEnforce]);
}
