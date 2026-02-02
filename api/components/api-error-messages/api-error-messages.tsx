/** @format */

import { Text } from '@/common/components/ui/text';
import { View } from 'react-native';

export function ApiErrorMessages({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;

  return (
    <View>
      {messages.map((message, index) => (
        <Text key={`${index}-${message}`} className="text-destructive">
          {message}
        </Text>
      ))}
    </View>
  );
}
