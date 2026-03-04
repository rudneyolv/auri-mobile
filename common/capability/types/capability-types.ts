export type CapabilityNextStep =
  | {
      label: string;
      href: string;
      action?: never;
    }
  | {
      label: string;
      action: () => void;
      href?: never;
    };

export interface Capability<T = never> {
  forceValueOnDisable?: T;
  isLoading?: boolean;
  enabled: boolean;
  guidance?: {
    reason: string;
    nextStep?: CapabilityNextStep;
  };
}
