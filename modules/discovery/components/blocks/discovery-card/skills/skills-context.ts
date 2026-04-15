import { createContext, useContext } from 'react';

interface SkillsContextValue {
  expanded: boolean;
  toggle: () => void;
  defaultVisible: number;
  totalCount: number;
}

export const SkillsContext = createContext<SkillsContextValue | null>(null);

export function useSkillsContext() {
  const context = useContext(SkillsContext);

  if (!context) {
    throw new Error('Skills compound components devem ser usados dentro de DiscoveryCard.Skills.Root.');
  }

  return context;
}
