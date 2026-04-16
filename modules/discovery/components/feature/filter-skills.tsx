import { Badge } from '@/common/components/ui/badge';
import { Button } from '@/common/components/ui/button';
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
import { proficiencyLevelOptions } from '@/common/form-options/form-options';
import { useLookup } from '@/common/hooks/use-lookup';
import { ProficiencyLevel } from '@/common/types/common-enums';
import { ResolvedDiscoveryFilters } from '@/modules/discovery/types/discovery-filters';
import { useGetSkills } from '@/modules/skill/hooks/api/use-skill-api';
import { X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

interface FilterSkillsProps {
  activeSkills: ResolvedDiscoveryFilters['skills'];
  onChange: (payload: { patch: Partial<ResolvedDiscoveryFilters> }) => void;
}

interface Draft {
  skillId?: string;
  proficiency?: ProficiencyLevel;
}

export function FilterSkills({ activeSkills, onChange }: FilterSkillsProps) {
  const { data: skills } = useGetSkills();
  const [draft, setDraft] = useState<Draft>({});
  // Força remount dos Selects após commit: @rn-primitives/select não reseta o label exibido quando value volta a undefined.
  const [resetKey, setResetKey] = useState(0);

  const activeIds = useMemo(() => activeSkills.map((skill) => skill.id), [activeSkills]);

  const { findById, getNameById, isActive, getAvailable } = useLookup({
    items: skills,
    activeIds,
  });

  function handleAdd() {
    if (!draft.skillId || isActive(draft.skillId)) return;

    onChange({
      patch: {
        skills: [
          ...activeSkills,
          {
            id: draft.skillId,
            proficiency_level: draft.proficiency,
          },
        ],
      },
    });

    setDraft({});
    setResetKey((value) => value + 1);
  }

  function handleRemove(skillId: string) {
    onChange({
      patch: {
        skills: activeSkills.filter((skill) => skill.id !== skillId),
      },
    });
  }

  const selectedSkill = draft.skillId ? findById(draft.skillId) : null;

  const selectedProficiency = draft.proficiency
    ? proficiencyLevelOptions.find((option) => option.value === draft.proficiency)
    : undefined;

  return (
    <View className="gap-2">
      <Label>Habilidades</Label>

      {activeSkills.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {activeSkills.map((skill) => (
            <Badge key={skill.id} variant="secondary" className="pr-1">
              <Text>
                {getNameById(skill.id)}
                {skill.proficiency_level ? ` · ${skill.proficiency_level}` : ''}
              </Text>
              <Pressable onPress={() => handleRemove(skill.id)} hitSlop={8}>
                <Icon as={X} className="size-3 text-secondary-foreground" />
              </Pressable>
            </Badge>
          ))}
        </View>
      )}

      <View className="flex-row gap-2">
        <View className="flex-1">
          <Select
            key={`skill-${resetKey}`}
            value={
              selectedSkill ? { value: selectedSkill.id, label: selectedSkill.name } : undefined
            }
            onValueChange={(option) => setDraft((prev) => ({ ...prev, skillId: option?.value }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Habilidade" />
            </SelectTrigger>
            <SelectContent>
              {getAvailable().map((skill) => (
                <SelectItem key={skill.id} label={skill.name} value={skill.id} />
              ))}
            </SelectContent>
          </Select>
        </View>

        <View className="flex-1">
          <Select
            key={`prof-${resetKey}`}
            value={selectedProficiency}
            onValueChange={(option) =>
              setDraft((prev) => ({
                ...prev,
                proficiency: option?.value as ProficiencyLevel | undefined,
              }))
            }>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Nível" />
            </SelectTrigger>
            <SelectContent>
              {proficiencyLevelOptions.map((option) => (
                <SelectItem key={option.value} label={option.label} value={option.value} />
              ))}
            </SelectContent>
          </Select>
        </View>
      </View>

      <Button variant="outline" size="sm" disabled={!draft.skillId} onPress={handleAdd}>
        <Text>Adicionar habilidade</Text>
      </Button>
    </View>
  );
}
