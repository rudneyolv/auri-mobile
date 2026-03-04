import { apiRequest } from '@/api';
import { CreateSkillDto, UpdateSkillDto } from '@/modules/skill/types/skill-api';
import { Skill, UserSkill } from '@/modules/skill/types/skill-entity';
export async function getSkills() {
  return await apiRequest<Skill[]>({
    endpoint: 'skills',
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function getUserSkill(skillId: string) {
  return await apiRequest<UserSkill>({
    endpoint: `profiles/me/skills/${skillId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'GET',
    },
  });
}

export async function createSkill(dto: CreateSkillDto) {
  return await apiRequest<Skill>({
    endpoint: 'profiles/me/skills',
    requiresAuth: true,
    requestConfig: {
      method: 'POST',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}

export async function updateSkill({ skillId, dto }: { skillId: string; dto: UpdateSkillDto }) {
  return await apiRequest<Skill>({
    endpoint: `profiles/me/skills/${skillId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'PATCH',
      body: JSON.stringify(dto),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  });
}

export async function removeSkill(skillId: string) {
  return await apiRequest<Skill>({
    endpoint: `profiles/me/skills/${skillId}`,
    requiresAuth: true,
    requestConfig: {
      method: 'DELETE',
    },
  });
}
