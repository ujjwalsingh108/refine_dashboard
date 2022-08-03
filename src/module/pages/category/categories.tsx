import { List, Table, useTable } from '@pankod/refine-antd';

import { ICategory } from '../../interfaces';

export const ListCategory: React.FC = () => {
  const { tableProps } = useTable<ICategory>();

  return (
    <div style={{ overflowY: 'scroll', maxHeight: '100vh' }}>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="Serial Numbers" />
          <Table.Column
            dataIndex="title"
            title="Listed Categories For The Post"
          />
        </Table>
      </List>
    </div>
  );
};
