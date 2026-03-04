import {
  createSkill,
  getSkills,
  getUserSkill,
  removeSkill,
  updateSkill,
} from '@/modules/skill/api/skill-api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useGetSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
  });
}

export function useGetUserSkill(skillId: string) {
  return useQuery({
    queryKey: ['user-skill', skillId],
    queryFn: () => getUserSkill(skillId),
  });
}

export function useCreateSkill() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createSkill,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}

export function useUpdateSkill() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['my-profile'] });
      qc.invalidateQueries({ queryKey: ['user-skill', variables.skillId] });
    },
  });
}

export function useRemoveSkill() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: removeSkill,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['my-profile'] });
    },
  });
}
