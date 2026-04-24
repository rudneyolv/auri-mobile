import { ProficiencyLevel } from '@/common/types/common-enums';
import { CollabCard } from '@/modules/collab/components/blocks/collab-card';
import { RespondCollabRequest } from '@/modules/collab/components/feature/respond-collab-request';
import { ReceivedCollabRequestResponse } from '@/modules/collab/types/collab-api';
import { formatCollabDate } from '@/modules/collab/utils/format-collab-date';

interface ReceivedCollabCardProps {
  item: ReceivedCollabRequestResponse;
}

export function ReceivedCollabCard({ item }: ReceivedCollabCardProps) {
  return (
    <CollabCard.Root>
      <CollabCard.Header>
        <CollabCard.Avatar
          name={item.from_user.name}
          imageUrl={item.from_user.profile_picture_url}
        />

        <CollabCard.Category
          name={item.from_user.primary_category_name}
          level={item.from_user.proficiency_level as ProficiencyLevel | null}
          years={item.from_user.years_experience}
        />
      </CollabCard.Header>

      <CollabCard.Content>
        <CollabCard.Status status="pending" />
        <CollabCard.Meta.Root>
          <CollabCard.Meta.Text>{`Recebida em ${formatCollabDate(item.created_at)}`}</CollabCard.Meta.Text>
        </CollabCard.Meta.Root>
        <CollabCard.Actions>
          <RespondCollabRequest requestId={item.request_id} />
        </CollabCard.Actions>
      </CollabCard.Content>
    </CollabCard.Root>
  );
}
