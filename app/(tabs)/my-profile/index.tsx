import { AddGenre } from '@/common/components/elements/add-genre';
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
import { Card } from '@/common/components/ui/card';
import { Icon } from '@/common/components/ui/icon';
import { Text } from '@/common/components/ui/text';
import { currentUser } from '@/data/mock';
import { BioForm } from '@/modules/user/components/feature/forms/bio-form';
import { RemoveSkill } from '@/modules/user/components/feature/remove-skill-dialog';
import { Stack, useRouter } from 'expo-router';
import { Pencil, Sparkles, X } from 'lucide-react-native';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="mx-auto flex h-full max-w-md flex-col">
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAwareScrollView>
        <View className="gap-6 p-6">
          <View className="flex flex-col items-center gap-2 text-center">
            <Avatar className="size-32" alt={currentUser.name}>
              <AvatarImage src={currentUser.photo} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>

            <Text className="text-2xl font-semibold">
              {currentUser.name}, {currentUser.age}
            </Text>
          </View>

          <BioForm currentBio={currentUser.bio} onSubmit={() => {}} />

          {/* Skills Section */}
          <Card className="p-4">
            <Text className="mb-3 font-semibold">Habilidades</Text>
            <View className="flex-col gap-2">
              {currentUser.skills.map((skill, index) => (
                <View key={index} className="relative rounded-xl border border-border bg-card p-3">
                  {/* Header */}
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-sm font-medium">{skill.name}</Text>

                    <View className="flex flex-row items-center gap-1">
                      <Button
                        variant="ghost"
                        className="size-7"
                        onPress={() =>
                          router.push({
                            pathname: '/(tabs)/my-profile/update-skill/[id]',
                            params: { id: skill.id },
                          })
                        }>
                        <Icon as={Pencil} />
                      </Button>

                      <RemoveSkill
                        id={skill.id}
                        name={skill.name}
                        onRemove={() => console.log('Skill removed')}
                      />
                    </View>
                  </View>

                  <View className="mt-2 flex flex-row gap-3">
                    {skill.isPrimary && (
                      <Badge variant="outline">
                        <Text className="text-xs">Primária</Text>
                      </Badge>
                    )}

                    <Badge variant="secondary">
                      <Text className="text-xs">{skill.proficiencyLevel}</Text>
                    </Badge>

                    <Badge variant="secondary">
                      <Text className="text-xs">{skill.yearsOfExperience} anos</Text>
                    </Badge>
                  </View>
                </View>
              ))}
            </View>

            {/* <AddSkill /> */}

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
            <View className="flex flex-row flex-wrap gap-2">
              {currentUser.genres.map((genre, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  <Text>{genre}</Text>

                  <Button variant="ghost" className="size-4">
                    <Icon as={X} className="size-4 text-destructive" />
                  </Button>
                </Badge>
              ))}
            </View>

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
