import { Icon } from '@/common/components/ui/icon';
import { cn } from '@/common/utils/ui/cn';
import { Loader2Icon, type LucideProps } from 'lucide-react-native';
import { useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export function Spinner({ className, size = 20, ...props }: LucideProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 800, easing: Easing.linear }),
      -1,
      false
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Icon
        as={Loader2Icon}
        size={size}
        className={cn('text-foreground', className)}
        {...props}
      />
    </Animated.View>
  );
}
