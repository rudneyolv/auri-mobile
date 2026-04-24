import { CollabsTabHeader } from '@/app-ui/tabs/likes/collabs-tab-header';
import { Text } from '@/common/components/ui/text';
import { CollabTab } from '@/modules/collab/types/collab-entity';
import { Slot, Stack, usePathname } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_OPTIONS = {
  title: 'Collabs',
  headerTransparent: true,
  headerShown: false,
};

function resolveActiveTab(pathname: string): CollabTab {
  return pathname.endsWith('/sent') ? 'sent' : 'received';
}

export default function CollabsLayout() {
  const pathname = usePathname();
  const activeTab = resolveActiveTab(pathname);

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={SCREEN_OPTIONS} />

      <View className="gap-4 border-b-muted px-6 pb-3 pt-6">
        <View className="gap-1">
          <Text variant="h3">Collabs</Text>
          <Text className="text-sm text-muted-foreground">
            Gerencie suas solicitações recebidas e enviadas.
          </Text>
        </View>

        <CollabsTabHeader activeTab={activeTab} />
      </View>

      <Slot />
    </SafeAreaView>
  );
}
