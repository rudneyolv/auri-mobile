import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Text } from '@/common/components/ui/text';
import { View } from 'react-native';

export function AddGenre() {
  return (
    <View className="gap-2">
      {/* TODO: Alterar para Select */}
      <Input
        id="skill"
        placeholder="Ex: pagode"
        keyboardType="email-address"
        autoComplete="email"
        autoCapitalize="none"
        returnKeyType="next"
        submitBehavior="submit"
      />

      <Button variant="secondary">
        <Text>Adicionar</Text>
      </Button>
    </View>
  );
}
