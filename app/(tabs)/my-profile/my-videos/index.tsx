import { Text } from '@/common/components/ui/text';
import { useGetMyprofile } from '@/modules/profiles/hooks/api/use-profile-api';
import { MyVideosScreen } from '@/modules/video/components/feature/my-videos-screen';

export default function MyVideosRoute() {
  const { data: myProfile, isLoading } = useGetMyprofile();

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  if (!myProfile) {
    return <Text>Perfil nao encontrado.</Text>;
  }

  return (
    <MyVideosScreen userId={myProfile.user_id} />
  );
}
