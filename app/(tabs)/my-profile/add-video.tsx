import { Card, CardContent } from '@/common/components/ui/card';
import { Text } from '@/common/components/ui/text';
import { useGetMyprofile } from '@/modules/profiles/hooks/api/use-profile-api';
import { VideoUploadForm } from '@/modules/video/components/feature/forms/video-upload-form';
import { useGetVideosByUserId } from '@/modules/video/hooks/api/use-video-api';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

export default function AddVideoScreen() {
  const router = useRouter();
  const { data: myProfile, isLoading: isLoadingProfile } = useGetMyprofile();

  const { data: myVideos, isLoading: isLoadingVideos } = useGetVideosByUserId({
    userId: myProfile?.user_id ?? '',
  });

  if (isLoadingProfile || isLoadingVideos) {
    return <Text>Carregando...</Text>;
  }

  if (!myProfile) {
    return <Text>Perfil nao encontrado.</Text>;
  }

  return (
    <KeyboardAwareScrollView bottomOffset={10}>
      <View className="h-full w-full items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent>
            <VideoUploadForm
              currentVideoCount={myVideos?.length ?? 0}
              onSuccess={() => {
                router.back();
              }}
            />
          </CardContent>
        </Card>
      </View>
    </KeyboardAwareScrollView>
  );
}
