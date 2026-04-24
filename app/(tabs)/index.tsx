import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';
import { Button } from '@/common/components/ui/button';
import { Icon } from '@/common/components/ui/icon';
import { Spinner } from '@/common/components/ui/spinner';
import { Text } from '@/common/components/ui/text';
import { SendCollabRequestCta } from '@/modules/collab/components/feature/send-collab-request-cta';
import { DiscoveryCard } from '@/modules/discovery/components/blocks/discovery-card';
import { DiscoveryFilter } from '@/modules/discovery/components/feature/discovery-filter';
import { useDiscovery } from '@/modules/discovery/hooks/api/use-discovery-api';
import { DiscoveryItem } from '@/modules/discovery/types/discovery-entity';
import { deserializeFilters } from '@/modules/discovery/utils/discovery-filters-serializer';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ArrowUpIcon } from 'lucide-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, View, type ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_OPTIONS = {
  title: 'Discovery',
  headerTransparent: true,
  headerShown: false,
};

const BACK_TO_TOP_THRESHOLD = 5;

export default function DiscoveryScreen() {
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const params = useLocalSearchParams<Record<string, string>>();
  const filters = useMemo(() => deserializeFilters({ params }), [params]);

  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useDiscovery({
    filters,
  });

  const profiles = useMemo(() => data?.pages.flatMap((page) => page.data) ?? [], [data]);

  const listRef = useRef<FlatList<DiscoveryItem>>(null);
  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 20 }).current;
  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length === 0) {
      setShowBackToTop(false);
      return;
    }
    const firstIndex = viewableItems[0].index ?? 0;
    setShowBackToTop(firstIndex >= BACK_TO_TOP_THRESHOLD);
  }).current;

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  console.log('filters', filters);

  const renderItem = ({ item: profile }: { item: DiscoveryItem }) => (
    <DiscoveryCard.Root>
      <DiscoveryCard.Header>
        <DiscoveryCard.Avatar name={profile.name} imageUrl={profile.profile_picture_url} />

        <DiscoveryCard.Category
          name={profile.primary_category.name}
          level={profile.primary_category.proficiency_level}
          years={profile.primary_category.years_experience}
        />
      </DiscoveryCard.Header>

      <DiscoveryCard.Content>
        <DiscoveryCard.Collab min={profile.collab_price_min} max={profile.collab_price_max} />

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
                <DiscoveryCard.Genres.Item key={genre.name}>{genre.name}</DiscoveryCard.Genres.Item>
              ))}
            </DiscoveryCard.Genres.List>
          ) : (
            <DiscoveryCard.Genres.Empty />
          )}
        </DiscoveryCard.Genres.Root>

        <SendCollabRequestCta
          targetUserId={profile.user_id}
          initialStatus={profile.collab_request_status}
        />
      </DiscoveryCard.Content>
    </DiscoveryCard.Root>
  );

  const ListEmpty = isLoading ? (
    <View className="items-center py-6">
      <Spinner />
    </View>
  ) : (
    <DiscoveryCard.Root>
      <DiscoveryCard.Content>
        <Text className="text-sm text-muted-foreground">
          Nenhum perfil disponível com os filtros atuais.
        </Text>
      </DiscoveryCard.Content>
    </DiscoveryCard.Root>
  );

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen options={SCREEN_OPTIONS} />

      <View className="gap-4 border-b-muted px-6 pb-3 pt-6">
        <View className="flex-row items-start justify-between gap-4">
          <View className="gap-1">
            <Text variant="h3">Discovery</Text>
            <Text className="text-sm text-muted-foreground">
              + de {profiles.length} perfis encontrados
            </Text>
          </View>

          <DiscoveryFilter />
        </View>

        {error && <ApiErrorMessages messages={error.messages} />}
      </View>

      <FlatList
        ref={listRef}
        data={profiles}
        keyExtractor={(item) => item.user_id}
        renderItem={renderItem}
        ListEmptyComponent={ListEmpty}
        contentContainerClassName="gap-4 p-6"
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <View className="items-center py-4">
              <Spinner />
            </View>
          ) : null
        }
      />

      {showBackToTop && (
        <Button
          size="icon"
          onPress={scrollToTop}
          className="absolute bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
          accessibilityLabel="Voltar ao topo">
          <Icon as={ArrowUpIcon} size={20} className="text-primary-foreground" />
        </Button>
      )}
    </SafeAreaView>
  );
}
