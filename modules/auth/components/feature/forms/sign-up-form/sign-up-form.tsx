import { Button } from '@/common/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/common/components/ui/card';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Separator } from '@/common/components/ui/separator';
import { Text } from '@/common/components/ui/text';
import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { Controller, DefaultValues, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, type TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SignUpFormValues, SignUpSchema } from '@/modules/auth/schemas/auth-schema';
import { ApiError } from '@/api';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';

interface SignUpFormProps {
  onSubmit: (data: SignUpFormValues) => void;
  isPending?: boolean;
  apiError?: ApiError | null;
  defaultValues?: DefaultValues<SignUpFormValues>;
}

export function SignUpForm({
  onSubmit,
  isPending = false,
  apiError,
  defaultValues,
}: SignUpFormProps) {
  const passwordInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  function onNameSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Crie sua conta</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Bem-vindo! Preencha os dados abaixo para começar.
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          <View className="gap-6">
            {/* Name Field */}
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <View className="gap-1.5" data-invalid={fieldState.invalid}>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Seu nome"
                    onChangeText={field.onChange}
                    returnKeyType="next"
                    editable={!isPending}
                    className={fieldState.error ? 'border-destructive' : ''}
                    onSubmitEditing={onNameSubmitEditing}
                    {...field}
                  />
                  {fieldState.error && (
                    <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Email Field */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <View className="gap-1.5" data-invalid={fieldState.invalid}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    onChangeText={field.onChange}
                    onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType="next"
                    editable={!isPending}
                    className={fieldState.error ? 'border-destructive' : ''}
                    {...field}
                    ref={emailInputRef}
                  />
                  {fieldState.error && (
                    <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Password Field */}
            <View className="gap-1.5">
              <View className="flex-row items-center">
                <Label htmlFor="password">Senha</Label>
                <Pressable
                  disabled={isPending}
                  onPress={() => {
                    // TODO: Navegar para recuperação de senha
                  }}
                  className="ml-auto">
                  <Text className="text-sm underline">Esqueceu?</Text>
                </Pressable>
              </View>

              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <View className="gap-1.5" data-invalid={fieldState.invalid}>
                    <Input
                      id="password"
                      secureTextEntry
                      onChangeText={field.onChange}
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      editable={!isPending}
                      className={fieldState.error ? 'border-destructive' : ''}
                      {...field}
                      ref={passwordInputRef}
                    />
                    {fieldState.error && (
                      <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
                    )}
                  </View>
                )}
              />
            </View>

            <ApiErrorMessages messages={apiError?.messages} />

            <Button
              className="w-full"
              onPress={handleSubmit(onSubmit)}
              disabled={isPending || !isValid}>
              {isPending ? (
                <View className="flex-row items-center gap-2">
                  <ActivityIndicator size="small" color="white" />
                  <Text>Criando...</Text>
                </View>
              ) : (
                <Text>Continuar</Text>
              )}
            </Button>
          </View>

          <Text className="text-center text-sm">
            Já possui uma conta?{' '}
            <Pressable
              disabled={isPending}
              onPress={() => {
                router.push('/sign-in' as const);
              }}>
              <Text className="text-sm underline underline-offset-4">Entrar</Text>
            </Pressable>
          </Text>

          <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">ou</Text>
            <Separator className="flex-1" />
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
