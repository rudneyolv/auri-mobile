import * as React from 'react';
import { Capability, CapabilityNextStep } from '@/common/capability/types/capability-types';
import { cn } from '@/common/utils/ui/cn';
import { View } from 'react-native';
import { Text } from '@/common/components/ui/text';
import { Link, RelativePathString } from 'expo-router';
import { Text as RNText } from 'react-native';
import { Button, ButtonProps } from '@/common/components/ui/button';

interface CapabilityGuidanceRootProps extends React.ComponentProps<typeof View> {
  // Usamos <any> aqui para aceitar entidades que forçam QUALQUER tipo de valor
  // O Root não faz nada com a capability, ele apenas renderiza se ela estiver desabilitada
  capability?: Capability<any>;
}

interface CapabilityGuidanceNextStepProps extends ButtonProps {
  nextStep?: CapabilityNextStep;
}

export function Root({ capability, className, ...props }: CapabilityGuidanceRootProps) {
  if (!capability || capability.enabled) return null;

  return <View className={cn('flex flex-col gap-1', className)} {...props} />;
}

interface CapabilityGuidanceReasonProps extends React.ComponentProps<typeof RNText> {}

export function Reason({ className, ...props }: CapabilityGuidanceReasonProps) {
  return <Text className={cn('text-sm text-destructive', className)} {...props} />;
}

interface CapabilityGuidanceNextStepProps extends ButtonProps {
  nextStep?: CapabilityNextStep;
  className?: string;
}

export function NextStep({ nextStep, className, ...buttonProps }: CapabilityGuidanceNextStepProps) {
  if (!nextStep) return null;

  const button = (
    <Button
      className={cn(className)}
      {...('action' in nextStep ? { onClick: nextStep.action } : {})}
      {...buttonProps}>
      <Text>{nextStep.label}</Text>
    </Button>
  );

  if (nextStep.href) {
    return <Link href={nextStep.href as RelativePathString}>{button}</Link>;
  }

  return button;
}
