import { useShow, useOne } from '@pankod/refine-core';
import { Show, Typography, Tag } from '@pankod/refine-antd';

import { ICategory, ILanguage, IUser } from '../../interfaces';

const { Title, Text } = Typography; // destructuring of variables ES6

export const PostShow = () => {
  const { queryResult } = useShow();

  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: categoryData } = useOne<ICategory>({
    resource: 'categories',
    id: record?.category.id || '',
    queryOptions: {
      enabled: !!record?.category.id,
    },
  });

  const { data: languageData } = useOne<ILanguage>({
    resource: 'languages',
    id: record?.language || '',
    queryOptions: {
      enabled: !!record?.language,
    },
  });

  const { data: postAuthor } = useOne<IUser>({
    resource: 'users',
    id: record?.user.id || '',
    queryOptions: {
      enabled: !!record?.user.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Title</Title>
      <Text>{record?.title}</Text>

      <Title level={5}>Status</Title>
      <Text>
        <Tag>{record?.status}</Tag>
      </Text>

      <Title level={5}>Category</Title>
      <Text>{categoryData?.data.title}</Text>

      <Title level={5}>Language Spoken</Title>
      <Text>{languageData?.data.title}</Text>

      <Title level={5}>Author of this Book</Title>
      <Text>{postAuthor?.data.firstName}</Text>
    </Show>
  );
};
