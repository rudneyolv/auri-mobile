import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';

export default function MyProfileLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        // RESOLVE O OVERLAP: Informa ao Native Stack que o conteúdo
        // NÃO deve vazar por baixo da Status Bar no Android.
        statusBarTranslucent: false,

        // Opcional: Centraliza no Android para ficar igual ao iOS
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="add-skill"
        options={{
          title: 'Adicionar Skill',
          presentation: 'modal',
        }}
      />

      <Stack.Screen
        name="update-skill/[id]"
        options={{
          title: 'Editar Skill',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
