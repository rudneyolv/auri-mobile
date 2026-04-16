import { Button } from '@/common/components/ui/button';
import { Input } from '@/common/components/ui/input';
import { Label } from '@/common/components/ui/label';
import { Text } from '@/common/components/ui/text';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import { useState } from 'react';
import { View } from 'react-native';

interface FilterCollabProps {
  activeCollab: ResolvedDiscoveryFilters['collab'];
  onChange: (payload: { patch: Partial<ResolvedDiscoveryFilters> }) => void;
}

export function FilterCollab({ activeCollab, onChange }: FilterCollabProps) {
  const [draft, setDraft] = useState({
    min: activeCollab.min !== undefined ? String(activeCollab.min) : '',
    max: activeCollab.max !== undefined ? String(activeCollab.max) : '',
  });

  function handleApply() {
    const min = draft.min ? Number(draft.min) : undefined;
    const max = draft.max ? Number(draft.max) : undefined;

    onChange({
      patch: {
        collab: {
          min: Number.isNaN(min) ? undefined : min,
          max: Number.isNaN(max) ? undefined : max,
        },
      },
    });
  }

  function handleClear() {
    setDraft({ min: '', max: '' });
    onChange({ patch: { collab: {} } });
  }

  return (
    <View className="gap-2">
      <Label>Preço de colaboração</Label>

      <View className="flex-row gap-2">
        <View className="flex-1">
          <Input
            placeholder="Mín"
            keyboardType="numeric"
            value={draft.min}
            onChangeText={(value) => setDraft((prev) => ({ ...prev, min: value }))}
          />
        </View>
        <View className="flex-1">
          <Input
            placeholder="Máx"
            keyboardType="numeric"
            value={draft.max}
            onChangeText={(value) => setDraft((prev) => ({ ...prev, max: value }))}
          />
        </View>
      </View>

      <View className="flex-row gap-2">
        <Button variant="outline" size="sm" className="flex-1" onPress={handleClear}>
          <Text>Limpar</Text>
        </Button>
        <Button size="sm" className="flex-1" onPress={handleApply}>
          <Text>Aplicar</Text>
        </Button>
      </View>
    </View>
  );
}
