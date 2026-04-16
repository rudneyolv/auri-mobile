import { Badge } from '@/common/components/ui/badge';
import { Icon } from '@/common/components/ui/icon';
import { Label } from '@/common/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { Text } from '@/common/components/ui/text';
import { useLookup } from '@/common/hooks/use-lookup';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import { useGetGenres } from '@/modules/genre/hooks/api/use-genre-api';
import { X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

interface FilterGenresProps {
  activeGenres: string[];
  onChange: (payload: { patch: Partial<ResolvedDiscoveryFilters> }) => void;
}

export function FilterGenres({ activeGenres, onChange }: FilterGenresProps) {
  const { data: genres } = useGetGenres();
  // Força remount do Select após commit: @rn-primitives/select não reseta o label exibido quando value volta a undefined.
  const [resetKey, setResetKey] = useState(0);

  const { getNameById, isActive, getAvailable } = useLookup({
    items: genres,
    activeIds: activeGenres,
  });

  function handleAdd(genreId: string) {
    if (isActive(genreId)) return;

    onChange({
      patch: {
        genres: [...activeGenres, genreId],
      },
    });

    setResetKey((value) => value + 1);
  }

  function handleRemove(genreId: string) {
    onChange({
      patch: {
        genres: activeGenres.filter((id) => id !== genreId),
      },
    });
  }

  return (
    <View className="gap-2">
      <Label>Gêneros</Label>

      {activeGenres.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {activeGenres.map((genreId) => (
            <Badge key={genreId} variant="secondary" className="pr-1">
              <Text>{getNameById(genreId)}</Text>
              <Pressable onPress={() => handleRemove(genreId)} hitSlop={8}>
                <Icon as={X} className="size-3 text-secondary-foreground" />
              </Pressable>
            </Badge>
          ))}
        </View>
      )}

      <Select
        key={`genre-${resetKey}`}
        value={undefined}
        onValueChange={(option) => {
          if (option?.value) handleAdd(option.value);
        }}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Adicionar gênero" />
        </SelectTrigger>
        <SelectContent>
          {getAvailable().map((genre) => (
            <SelectItem key={genre.id} label={genre.name} value={genre.id} />
          ))}
        </SelectContent>
      </Select>
    </View>
  );
}
