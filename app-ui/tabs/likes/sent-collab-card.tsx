import { ProficiencyLevel } from '@/common/types/common-enums';
import { CollabCard } from '@/modules/collab/components/blocks/collab-card';
import { CancelCollabRequest } from '@/modules/collab/components/feature/cancel-collab-request';
import { SentCollabRequestResponse } from '@/modules/collab/types/collab-api';
import { formatCollabDate } from '@/modules/collab/utils/format-collab-date';

interface SentCollabCardProps {
  item: SentCollabRequestResponse;
}

export function SentCollabCard({ item }: SentCollabCardProps) {
  return (
    <CollabCard.Root>
      <CollabCard.Header>
        <CollabCard.Avatar name={item.to_user.name} imageUrl={item.to_user.profile_picture_url} />

        <CollabCard.Category
          name={item.to_user.primary_category_name}
          level={item.to_user.proficiency_level as ProficiencyLevel | null}
          years={item.to_user.years_experience}
        />
      </CollabCard.Header>

      <CollabCard.Content>
        <CollabCard.Status status={item.status} />
        <CollabCard.Meta.Root>
          <CollabCard.Meta.Text>{`Enviada em ${formatCollabDate(item.created_at)}`}</CollabCard.Meta.Text>
          {item.accepted_at ? (
            <CollabCard.Meta.Text className="text-xs">
              {`Aceita em ${formatCollabDate(item.accepted_at)}`}
            </CollabCard.Meta.Text>
          ) : null}
        </CollabCard.Meta.Root>
        {item.status === 'pending' ? (
          <CollabCard.Actions>
            <CancelCollabRequest requestId={item.request_id} />
          </CollabCard.Actions>
        ) : null}
      </CollabCard.Content>
    </CollabCard.Root>
  );
}
