import { DiscoveryCardAvatar } from './discovery-card-avatar';
import { DiscoveryCardCategory } from './discovery-card-category';
import { DiscoveryCardCollab } from './discovery-card-collab';
import { DiscoveryCardContent } from './discovery-card-content';
import { DiscoveryCardHeader } from './discovery-card-header';
import { DiscoveryCardRoot } from './discovery-card-root';
import { DiscoveryCardGenresEmpty } from './genres/genres-empty';
import { DiscoveryCardGenresItem } from './genres/genres-item';
import { DiscoveryCardGenresList } from './genres/genres-list';
import { DiscoveryCardGenresRoot } from './genres/genres-root';
import { DiscoveryCardSkillsEmpty } from './skills/skills-empty';
import { DiscoveryCardSkillsItem } from './skills/skills-item';
import { DiscoveryCardSkillsList } from './skills/skills-list';
import { DiscoveryCardSkillsRoot } from './skills/skills-root';
import { DiscoveryCardSkillsToggle } from './skills/skills-toggle';

export const DiscoveryCard = {
  Root: DiscoveryCardRoot,
  Header: DiscoveryCardHeader,
  Content: DiscoveryCardContent,
  Avatar: DiscoveryCardAvatar,
  Category: DiscoveryCardCategory,
  Collab: DiscoveryCardCollab,
  Skills: {
    Root: DiscoveryCardSkillsRoot,
    List: DiscoveryCardSkillsList,
    Item: DiscoveryCardSkillsItem,
    Toggle: DiscoveryCardSkillsToggle,
    Empty: DiscoveryCardSkillsEmpty,
  },
  Genres: {
    Root: DiscoveryCardGenresRoot,
    List: DiscoveryCardGenresList,
    Item: DiscoveryCardGenresItem,
    Empty: DiscoveryCardGenresEmpty,
  },
};
