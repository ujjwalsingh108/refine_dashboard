import { useShow, useOne } from '@pankod/refine-core';
import { Show, Typography } from '@pankod/refine-antd';

import { ICategory } from 'module/interfaces';

const { Title, Text } = Typography;

export const ShowCategory = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const record = data?.data;
  console.log(record);

  const { data: categoryData } = useOne<ICategory>({
    resource: 'categories',
    id: record?.id || '',
    queryOptions: {
      enabled: !!record?.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Category</Title>
      <Text>{categoryData?.data.title}</Text>
    </Show>
  );
};
