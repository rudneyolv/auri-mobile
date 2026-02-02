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
import { SignInFormValues, SignInSchema } from '@/modules/auth/schemas/auth-schema';
import { useRouter } from 'expo-router';
import { ApiError } from '@/api';
import { ApiErrorMessages } from '@/api/components/api-error-messages/api-error-messages';

interface SignInFormProps {
  onSubmit: (data: SignInFormValues) => void;
  isPending?: boolean;
  apiError?: ApiError | null;
  defaultValues?: DefaultValues<SignInFormValues>;
}

export function SignInForm({
  onSubmit,
  isPending = false,
  apiError,
  defaultValues,
}: SignInFormProps) {
  const passwordInputRef = React.useRef<TextInput>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    mode: 'onChange',
    defaultValues: defaultValues,
  });

  function onEmailSubmitEditing() {
    passwordInputRef.current?.focus();
  }

  return (
    <View className="gap-6">
      <Card className="border-border/0 shadow-none sm:border-border sm:shadow-sm sm:shadow-black/5">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-left">Entrar no Auri</CardTitle>
          <CardDescription className="text-center sm:text-left">
            Bem-vindo de volta! Faça login para continuar
          </CardDescription>
        </CardHeader>
        <CardContent className="gap-6">
          {/* <Text style={{ fontFamily: 'monospace' }}>{JSON.stringify(watch(), null, 2)}</Text> */}

          <View className="gap-6">
            {/* Email Field */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <View className="gap-1.5" data-invalid={fieldState.invalid}>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    onChangeText={field.onChange}
                    placeholder="seu@email.com"
                    keyboardType="email-address"
                    autoComplete="email"
                    autoCapitalize="none"
                    onSubmitEditing={onEmailSubmitEditing}
                    returnKeyType="next"
                    submitBehavior="submit"
                    editable={!isPending}
                    className={fieldState.error ? 'border-destructive' : ''}
                    {...field}
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
                <Button
                  variant="link"
                  size="sm"
                  className="ml-auto h-4 px-1 py-0 web:h-fit sm:h-4"
                  disabled={isPending}>
                  <Text className="font-normal leading-4">Esqueceu sua senha?</Text>
                </Button>
              </View>

              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <View className="gap-1.5" data-invalid={fieldState.invalid}>
                    <Input
                      id="password"
                      onChangeText={field.onChange}
                      secureTextEntry
                      returnKeyType="send"
                      onSubmitEditing={handleSubmit(onSubmit)}
                      editable={!isPending}
                      className={fieldState.error ? 'border-destructive' : ''}
                      {...field}
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
                  <Text>Entrando...</Text>
                </View>
              ) : (
                <Text>Continuar</Text>
              )}
            </Button>
          </View>

          <Text className="text-center text-sm">
            Ainda não tem uma conta?{' '}
            <Pressable
              disabled={isPending}
              onPress={() => {
                router.push('/sign-up');
              }}>
              <Text className="text-center text-sm underline underline-offset-4">Cadastre-se</Text>
            </Pressable>
          </Text>

          {/* <View className="flex-row items-center">
            <Separator className="flex-1" />
            <Text className="px-4 text-sm text-muted-foreground">ou</Text>
            <Separator className="flex-1" />
          </View>

          <SocialConnections disabled={isPending} /> */}
        </CardContent>
      </Card>
    </View>
  );
}
