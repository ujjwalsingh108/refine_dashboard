import { useShow, useOne } from '@pankod/refine-core';
import { Show, Typography } from '@pankod/refine-antd';

import { ITags } from 'module/interfaces';

const { Title, Text } = Typography;

export const ShowTag = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: tagsData } = useOne<ITags>({
    resource: 'tags',
    id: record?.id || '',
    queryOptions: {
      enabled: !!record?.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Tags</Title>
      <Text>{tagsData?.data.title}</Text>
    </Show>
  );
};
