import { Button } from '@/common/components/ui/button';
import { Text } from '@/common/components/ui/text';
import { CollabTab } from '@/modules/collab/types/collab-entity';
import { router } from 'expo-router';
import { View } from 'react-native';

interface CollabsTabHeaderProps {
  activeTab: CollabTab;
}

export function CollabsTabHeader({ activeTab }: CollabsTabHeaderProps) {
  const handleNavigate = (tab: CollabTab) => {
    router.replace(tab === 'received' ? '/likes/received' : '/likes/sent');
  };

  return (
    <View className="flex-row gap-2">
      <Button
        onPress={() => handleNavigate('received')}
        variant={activeTab === 'received' ? 'default' : 'secondary'}
        className="flex-1">
        <Text>Recebidas</Text>
      </Button>

      <Button
        onPress={() => handleNavigate('sent')}
        variant={activeTab === 'sent' ? 'default' : 'secondary'}
        className="flex-1">
        <Text>Enviadas</Text>
      </Button>
    </View>
  );
}
