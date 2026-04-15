import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Text } from '@/common/components/ui/text';
import { DiscoveryCard } from '@/modules/discovery/components/blocks/discovery-card';
import { useDiscovery } from '@/modules/discovery/hooks/api/use-discovery-api';
import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_OPTIONS = {
  title: 'Discovery',
  headerTransparent: true,
  headerShown: false,
};

export default function Screen() {
  const { data, isLoading, error } = useDiscovery();
  const profiles = data?.data ?? [];

  if (isLoading) return <Text>Carregando...</Text>;

  if (error) return <ApiErrorMessages messages={error.messages} />;

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={SCREEN_OPTIONS} />

      <ScrollView contentContainerClassName="gap-4 p-6">
        <View className="gap-1">
          <Text variant="h3">Discovery</Text>
          <Text className="text-sm text-muted-foreground">
            {data?.meta.total ?? 0} perfis encontrados
          </Text>
        </View>

        {profiles.length === 0 ? (
          <DiscoveryCard.Root>
            <DiscoveryCard.Content>
              <Text className="text-sm text-muted-foreground">
                Nenhum perfil disponível com os filtros atuais.
              </Text>
            </DiscoveryCard.Content>
          </DiscoveryCard.Root>
        ) : (
          profiles.map((profile) => (
            <DiscoveryCard.Root key={profile.user_id}>
              <DiscoveryCard.Header>
                <DiscoveryCard.Avatar name={profile.name} imageUrl={profile.profile_picture_url} />

                <DiscoveryCard.Category
                  name={profile.primary_category.name}
                  level={profile.primary_category.proficiency_level}
                  years={profile.primary_category.years_experience}
                />
              </DiscoveryCard.Header>

              <DiscoveryCard.Content>
                <DiscoveryCard.Collab
                  min={profile.collab_price_min}
                  max={profile.collab_price_max}
                />

                <DiscoveryCard.Skills.Root defaultVisible={3}>
                  <DiscoveryCard.Skills.List>
                    {profile.skills.map((skill) => (
                      <DiscoveryCard.Skills.Item
                        key={skill.name}
                        name={skill.name}
                        level={skill.proficiency_level}
                        years={skill.years_experience}
                      />
                    ))}
                  </DiscoveryCard.Skills.List>

                  <DiscoveryCard.Skills.Toggle />
                  <DiscoveryCard.Skills.Empty />
                </DiscoveryCard.Skills.Root>

                <DiscoveryCard.Genres.Root>
                  {profile.genres.length > 0 ? (
                    <DiscoveryCard.Genres.List>
                      {profile.genres.map((genre) => (
                        <DiscoveryCard.Genres.Item key={genre.name}>
                          {genre.name}
                        </DiscoveryCard.Genres.Item>
                      ))}
                    </DiscoveryCard.Genres.List>
                  ) : (
                    <DiscoveryCard.Genres.Empty />
                  )}
                </DiscoveryCard.Genres.Root>
              </DiscoveryCard.Content>
            </DiscoveryCard.Root>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
