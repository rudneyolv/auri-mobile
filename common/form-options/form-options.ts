import { ProficiencyLevel, YearsOfExperience } from '@/common/array-enums/array-enums';

export const proficiencyLevelOptions = ProficiencyLevel.map((level) => ({
  label: level,
  value: level,
}));

export const YearsOfExperienceOptions = YearsOfExperience.map((year) => ({
  label: year === '0' ? 'Menos de 1 ano' : `${year} Anos`,
  value: year,
}));
