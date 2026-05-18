import { ChatScreen } from '@/modules/message/components/feature/chat-screen';
import { useOpenConversationStore } from '@/modules/message/state/open-conversation-store';
import { Stack, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';

export default function ChatRoute() {
  const { conversationId } = useLocalSearchParams<{ conversationId: string }>();
  const setCurrentId = useOpenConversationStore((s) => s.setCurrentId);

  useFocusEffect(
    useCallback(() => {
      if (!conversationId) return;
      setCurrentId(conversationId);
      return () => setCurrentId(null);
    }, [conversationId, setCurrentId]),
  );

  if (!conversationId) return null;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ChatScreen conversationId={conversationId} />
    </>
  );
}
