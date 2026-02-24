import { Button } from '@/common/components/ui/button';
import { Play, Grid3x3, MessageCircle, User } from 'lucide-react-native';
import { View, Text } from 'react-native';

interface BottomNavProps {
  activeTab: 'feed' | 'matches' | 'chat' | 'profile';
  onTabChange: (tab: 'feed' | 'matches' | 'chat' | 'profile') => void;
  unreadCount?: number;
}

export function BottomNav({ activeTab, onTabChange, unreadCount = 0 }: BottomNavProps) {
  const tabs = [
    { id: 'feed' as const, icon: Play, label: 'Feed' },
    { id: 'matches' as const, icon: Grid3x3, label: 'Matches' },
    { id: 'chat' as const, icon: MessageCircle, label: 'Chat' },
    { id: 'profile' as const, icon: User, label: 'Perfil' },
  ];

  return (
    <View className="fixed bottom-0 left-0 right-0 border-t border-border bg-background">
      <View className="mx-auto flex h-16 max-w-md items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <Button
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              className="relative flex h-full flex-1 flex-col items-center justify-center">
              <View className="relative">
                <Icon
                  className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {tab.id === 'chat' && unreadCount > 0 && (
                  <View className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    <Text className="text-xs text-destructive-foreground">{unreadCount}</Text>
                  </View>
                )}
              </View>
              <Text
                className={`mt-1 text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {tab.label}
              </Text>
            </Button>
          );
        })}
      </View>
    </View>
  );
}
