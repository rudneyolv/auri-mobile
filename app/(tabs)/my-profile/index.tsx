import { AddGenre } from '@/common/components/elements/add-genre';
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Button } from '@/common/components/ui/button';
import { Card } from '@/common/components/ui/card';
import { Icon } from '@/common/components/ui/icon';
import { Text } from '@/common/components/ui/text';
import { currentUser } from '@/data/mock';
import { MyCategoriesList } from '@/modules/category/components/feature/my-categories-list/my-categories-list';
import { MyGenresList } from '@/modules/genre/components/feature/my-genres-list/my-genres-list';
import { BioForm } from '@/modules/profiles/components/feature/forms/bio-form';
import { useGetMyprofile, useUpdateBio } from '@/modules/profiles/hooks/api/use-profile-api';
import { MySkillsList } from '@/modules/skill/components/feature/my-skills-list/my-skills-list';
import { Stack, useRouter } from 'expo-router';
import { Sparkles } from 'lucide-react-native';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();
  const { data: myProfile, isLoading } = useGetMyprofile();
  const { mutate: updateBio, isPending: isUpdatingBio, error: bioUpdateError } = useUpdateBio();

  if (isLoading || !myProfile) return <Text>Carregando...</Text>;

  return (
    <SafeAreaView className="mx-auto flex h-full max-w-md flex-col">
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAwareScrollView>
        <View className="gap-6 p-6">
          <View className="flex flex-col items-center gap-2 text-center">
            <Avatar className="size-32" alt={currentUser.name}>
              <AvatarImage src={currentUser.photo} />
              <AvatarFallback>{myProfile.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <Text className="text-2xl font-semibold">
              {myProfile.name}, {currentUser.age}
            </Text>
          </View>

          <BioForm
            currentBio={myProfile.bio || ''}
            onSubmit={(newBio) => updateBio(newBio)}
            isLoading={isUpdatingBio}
            apiError={bioUpdateError}
          />

          {/* Categories Section */}
          <Card className="p-4">
            <Text className="mb-3 font-semibold">O que eu faço</Text>

            <MyCategoriesList categories={myProfile.categories} />

            <Button
              variant="outline"
              className="h-12 w-full border-dashed"
              onPress={() => router.push('/(tabs)/my-profile/add-category')}>
              <Text className="text-primary">+ Adicionar nova categoria</Text>
            </Button>
          </Card>

          {/* Skills Section */}
          <Card className="p-4">
            <Text className="mb-3 font-semibold">Habilidades</Text>

            <MySkillsList skills={myProfile.skills} />

            <Button
              variant="outline"
              className="h-12 w-full border-dashed"
              onPress={() => router.push('/(tabs)/my-profile/add-skill')}>
              <Text className="text-primary">+ Adicionar nova skill</Text>
            </Button>
          </Card>

          {/* Genres Section */}
          <Card className="p-4">
            <Text className="mb-3 font-semibold">Gêneros Musicais</Text>
            <MyGenresList genres={myProfile.genres} />

            <AddGenre />
          </Card>

          {/* Premium Upgrade Button */}
          <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/20 p-6">
            <View className="absolute right-0 top-0 opacity-10">
              <Icon as={Sparkles} className="h-32 w-32" />
            </View>
            <View className="relative z-10">
              <View className="mb-2 flex items-center gap-2">
                <Icon as={Sparkles} className="h-5 w-5 text-primary" />
                <Text className="text-lg font-semibold">Upgrade Premium</Text>
              </View>
              <Text className="mb-4 text-sm text-muted-foreground">
                Desbloqueie recursos exclusivos, veja quem te curtiu primeiro e tenha matches
                ilimitados!
              </Text>
              <Button variant="secondary" className="w-full shadow-lg hover:opacity-90">
                <Icon as={Sparkles} className="mr-2 h-4 w-4" />
                <Text>Ver Planos Premium</Text>
              </Button>
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}
