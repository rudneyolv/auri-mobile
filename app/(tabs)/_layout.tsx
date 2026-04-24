import { Stack, Tabs } from 'expo-router';
import { Play, MessageCircle, User, Heart } from 'lucide-react-native';
import { View, Text } from 'react-native';
import { useColorScheme } from 'nativewind';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: isDark ? '#27272a' : '#e4e4e7',
          backgroundColor: isDark ? '#09090b' : '#ffffff',

          height: 64 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={Play} label="Feed" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => <TabIcon icon={Heart} label="Collabs" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,

          tabBarIcon: ({ focused }) => (
            <TabIcon icon={MessageCircle} label="Chat" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon icon={User} label="Perfil" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  icon: Icon,
  label,
  focused,
  badge,
}: {
  icon: any;
  label: string;
  focused: boolean;
  badge?: number;
}) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Cores do tema
  const primaryColor = isDark ? '#ffffff' : '#5c5c5c'; // purple-500 / purple-600
  const mutedColor = isDark ? '#5c5c5c' : '#a1a1aa'; // zinc-500 / zinc-400

  return (
    <View className="flex-row items-center justify-center gap-1">
      <View className="relative">
        <Icon
          color={focused ? primaryColor : mutedColor}
          size={24}
          strokeWidth={focused ? 2.5 : 2}
        />
        {badge && badge > 0 && (
          <View className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive">
            <Text className="text-[10px] font-semibold text-destructive-foreground">{badge}</Text>
          </View>
        )}
      </View>
      <Text
        style={{ color: focused ? primaryColor : mutedColor }}
        className={`text-xs ${focused ? 'font-semibold' : 'font-normal'}`}>
        {label}
      </Text>
    </View>
  );
}
