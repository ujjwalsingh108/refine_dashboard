import { List, Table, useTable } from '@pankod/refine-antd';

import { ITags } from '../../interfaces';

export const TagCategory: React.FC = () => {
  const { tableProps } = useTable<ITags>();

  return (
    <div style={{ overflowY: 'scroll', maxHeight: '100vh' }}>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="Serial Numbers" />
          <Table.Column dataIndex="title" title="Listed Tags For The Post" />
        </Table>
      </List>
    </div>
  );
};
