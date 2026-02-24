import { Button } from '@/common/components/ui/button';
import { Checkbox } from '@/common/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import { Icon } from '@/common/components/ui/icon';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Text } from '@/common/components/ui/text';
import { Pencil } from 'lucide-react-native';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

interface AddSkillFormValues {
  name: string;
  proficiencyLevel: string;
  yearsOfExperience: string;
  isPrimary: boolean;
}

export function ProfileTypeDialog() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<AddSkillFormValues>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      proficiencyLevel: '',
      yearsOfExperience: '',
      isPrimary: false,
    },
  });

  function onSubmit(data: AddSkillFormValues) {
    console.log(data);
    reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="size-4">
          <Icon as={Pencil} className="size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle>Perfil</DialogTitle>
        </DialogHeader>

        <View className="gap-4">
          {/* Skill name */}
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <View className="gap-1.5">
                <Label>Tipo de perfil</Label>
                <Input
                  placeholder="Ex: Mixagem"
                  onChangeText={field.onChange}
                  className={fieldState.error ? 'border-destructive' : ''}
                  {...field}
                />
                {fieldState.error && (
                  <Text className="text-sm text-destructive">{fieldState.error.message}</Text>
                )}
              </View>
            )}
          />

          {/* Proficiency */}
          <Controller
            control={control}
            name="proficiencyLevel"
            render={({ field }) => (
              <View className="gap-1.5">
                <Label>Proficiência</Label>
                <Input placeholder="Ex: Avançado" onChangeText={field.onChange} {...field} />
              </View>
            )}
          />

          {/* Years */}
          <Controller
            control={control}
            name="yearsOfExperience"
            render={({ field }) => (
              <View className="gap-1.5">
                <Label>Anos de experiência</Label>
                <Input
                  placeholder="Ex: 3"
                  keyboardType="numeric"
                  onChangeText={field.onChange}
                  {...field}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="isPrimary"
            render={({ field }) => (
              <View className="flex-row gap-1.5">
                <Label>Principal</Label>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </View>
            )}
          />
        </View>

        <DialogFooter className="mt-4">
          <Button className="w-full" disabled={!isValid} onPress={handleSubmit(onSubmit)}>
            <Text>Salvar habilidade</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
