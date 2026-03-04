import { apiRequest } from '@/api';
import { CreateSkillDto, UpdateSkillDto } from '@/modules/skills/types/skills-api';
import { Skill, UserSkill } from '@/modules/skills/types/skills-entity';
import { CreateSkillForm } from '@/modules/skills/types/skills-form';

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
  console.log(dto);

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
