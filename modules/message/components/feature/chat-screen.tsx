import { Button } from '@/common/components/ui/button';
import { Spinner } from '@/common/components/ui/spinner';
import { Text } from '@/common/components/ui/text';
import { ChatEmptyState } from '@/modules/message/components/blocks/chat-empty-state';
import { ChatHeader } from '@/modules/message/components/feature/chat-header';
import { useFetchConversation } from '@/modules/message/hooks/api/use-conversations';
import {
  useFetchMessages,
  useMarkAsRead,
  useSendMessage,
} from '@/modules/message/hooks/api/use-messages';
import { UiMessage } from '@/modules/message/types/message-entity';
import { GiftedChat, toGiftedMessage } from '@/modules/message/utils/gifted-chat-helpers';
import { useGetMyprofile } from '@/modules/profiles/hooks/api/use-profile-api';
import { useColorScheme } from 'nativewind';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { Platform, TextInput, View } from 'react-native';
import type { IMessage } from 'react-native-gifted-chat';

interface ChatScreenProps {
  conversationId: string;
}

export function ChatScreen({ conversationId }: ChatScreenProps) {
  const { colorScheme } = useColorScheme();
  const { data: myProfile } = useGetMyprofile();
  const { data: conversation } = useFetchConversation(conversationId);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFetchMessages(conversationId);

  const { mutate: sendMessage } = useSendMessage(conversationId);
  const { mutate: markAsRead } = useMarkAsRead(conversationId);

  // Mantemos o input como uncontrolled (GiftedChat gerencia o state interno).
  // A ref espelha o texto atual para que handleSend consiga ler no Enter
  // sem precisar de useState (que causaria re-render a cada tecla).
  const inputTextRef = useRef('');
  const textInputRef = useRef<TextInput>(null);

  // TODO: trocar para realtime via MessagesGateway/`message:read` quando o
  // socket /messages for conectado no mobile. Hoje o markAsRead é HTTP one-shot
  // — o sender só vê o "lido" após F5/refetch, não em tempo real.
  useEffect(() => {
    markAsRead();
  }, [markAsRead, conversationId]);

  const handleSend = useCallback(() => {
    const trimmed = inputTextRef.current.trim();
    if (!trimmed || !myProfile) return;
    sendMessage({
      dto: { content: trimmed, content_type: 'text' },
      currentUserId: myProfile.user_id,
    });
    inputTextRef.current = '';
    textInputRef.current?.clear();
  }, [sendMessage, myProfile]);

  const giftedMessages = useMemo<IMessage[]>(() => {
    if (!data || !myProfile) return [];

    const partnerName = conversation?.other_user.name ?? null;
    const partnerAvatar = conversation?.other_user.profile_picture_url ?? null;

    return data.pages
      .flatMap((page) => page.messages)
      .map((message) =>
        toGiftedMessage({
          message: message as UiMessage,
          currentUserId: myProfile.user_id,
          partnerName,
          partnerAvatar,
        })
      );
  }, [data, myProfile, conversation]);

  if (isLoading || !myProfile) {
    return (
      <View className="flex-1 bg-background">
        {conversation && <ChatHeader partner={conversation.other_user} />}
        <View className="flex-1 items-center justify-center">
          <Spinner />
        </View>
      </View>
    );
  }

  if (!conversation) {
    return (
      <View className="flex-1 bg-background">
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-center text-sm text-muted-foreground">
            Conversa não encontrada.
          </Text>
        </View>
      </View>
    );
  }

  const giftedProps = {
    messages: giftedMessages,
    user: { _id: myProfile.user_id },
    textInputRef,
    // Sem isso, o GiftedChat cai no useColorScheme do RN e segue o tema do SO,
    // ignorando o tema controlado do nosso app.
    colorScheme: colorScheme ?? 'light',
    // TODO: bolhas de mensagem com texto longo (com ou sem espaços) estouram
    // o container em web. Tentativas com textStyle.wordBreak/overflowWrap e
    // messageTextStyle não resolveram — a maxWidth: '70%' do Message/styles.ts
    // não está sendo respeitada no RN Web. Investigar wrapperStyle e/ou
    // customizar via renderBubble.
    // Em web, strings longas sem espaço (ex: 'aaaaaaaa...') estouram o container
    // da bolha. wordBreak resolve só no DOM; em nativo é flexShrink/maxWidth.
    messageTextStyle: Platform.OS === 'web' ? { wordBreak: 'break-word' as const } : undefined,
    onSend: (msgs: IMessage[]) => {
      inputTextRef.current = msgs[0]?.text ?? '';
      handleSend();
    },
    loadEarlierMessagesProps: {
      isAvailable: hasNextPage ?? false,
      isLoading: isFetchingNextPage,
      isInfiniteScrollEnabled: true,
      onPress: () => fetchNextPage(),
    },
    renderChatEmpty: () => (
      <View style={{ flex: 1, transform: [{ scaleY: -1 }] }}>
        <ChatEmptyState partnerName={conversation.other_user.name ?? 'este usuário'} />
      </View>
    ),
    renderSend: ({ text }: { text?: string }) => {
      const disabled = !text?.trim();
      return (
        <View className="justify-end py-2 pr-2">
          <Button size="sm" disabled={disabled} onPress={handleSend}>
            <Text>Enviar</Text>
          </Button>
        </View>
      );
    },
    textInputProps: {
      autoCorrect: true,
      // A lib lê placeholder de textInputProps.placeholder, não da prop raiz.
      placeholder: 'Mensagem...',
      // Espelha o texto digitado em uma ref para o Enter conseguir ler
      // sem precisar de useState (que causaria re-render a cada tecla).
      onChangeText: (text: string) => {
        inputTextRef.current = text;
      },
      // Mobile: Enter no teclado virtual envia (returnKeyType 'send' troca
      // o rótulo do botão), blurOnSubmit=false impede o teclado de fechar.
      ...(Platform.OS !== 'web' && {
        returnKeyType: 'send' as const,
        blurOnSubmit: false,
        onSubmitEditing: handleSend,
      }),
      // Web: Enter envia, Shift+Enter quebra linha. preventDefault evita
      // que o textarea insira "\n" antes de limparmos o input.
      ...(Platform.OS === 'web' && {
        onKeyPress: (e: any) => {
          if (e.nativeEvent.key === 'Enter' && !e.nativeEvent.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        },
      }),
    },
    alwaysShowSend: true,
  };

  return (
    <View className="flex-1 bg-background">
      <ChatHeader partner={conversation.other_user} />
      <GiftedChat {...giftedProps} />
    </View>
  );
}
