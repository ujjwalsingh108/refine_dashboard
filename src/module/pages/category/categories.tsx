import {
  List,
  Table,
  useTable,
  Modal,
  Icons,
  useModalForm,
  useSelect,
  Space,
  ShowButton,
  EditButton,
  DeleteButton,
  Form,
  Select,
} from '@pankod/refine-antd';

import { ICategory } from '../../interfaces';

export const ListCategory: React.FC = () => {
  const { tableProps } = useTable<ICategory>();

  const { modalProps, formProps, show, queryResult } = useModalForm<ICategory>({
    action: 'edit',
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm<ICategory>({
    action: 'create',
  });

  const { selectProps: categorySelectProps } = useSelect<ICategory>({
    resource: 'categories',
    defaultValue: queryResult?.data?.data.id,
  });

  return (
    <div style={{ overflowY: 'scroll', maxHeight: '100vh' }}>
      <List createButtonProps={{ onClick: () => createShow() }}>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="Serial Numbers" />
          <Table.Column
            dataIndex="title"
            title="Listed Categories For The Post"
          />
          <Table.Column<ICategory>
            title="Actions"
            dataIndex="actions"
            render={(_text, record): React.ReactNode => {
              return (
                <Space>
                  <ShowButton size="small" recordItemId={record.id} hideText />
                  <EditButton
                    size="small"
                    onClick={() => show(record.id)}
                    recordItemId={record.id}
                    hideText
                  />
                  <DeleteButton
                    size="small"
                    recordItemId={record.id}
                    hideText
                  />
                </Space>
              );
            }}
          />
        </Table>
        <Modal {...modalProps}>
          <Form {...formProps} layout="vertical">
            <Form.Item
              label="Categories"
              name={['category', 'id']}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Category"
                {...categorySelectProps}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal {...createModalProps}>
          <Form {...createFormProps} layout="vertical">
            <Form.Item
              label="Category"
              name={['category', 'id']}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...categorySelectProps} />
            </Form.Item>
          </Form>
        </Modal>
      </List>
    </div>
  );
};
