import {
  DeleteButton,
  EditButton,
  Form,
  List,
  Modal,
  Select,
  ShowButton,
  Space,
  Table,
  useModalForm,
  useSelect,
  useTable,
} from '@pankod/refine-antd';

import { ITags } from '../../interfaces';

export const TagCategory: React.FC = () => {
  const { tableProps } = useTable<ITags>();

  const { modalProps, formProps, show, queryResult } = useModalForm<ITags>({
    action: 'edit',
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm<ITags>({
    action: 'create',
  });

  const { selectProps: tagsSelectProps } = useSelect<ITags>({
    resource: 'tags',
    defaultValue: queryResult?.data?.data.id,
  });

  return (
    <div style={{ overflowY: 'scroll', maxHeight: '100vh' }}>
      <List createButtonProps={{ onClick: () => createShow() }}>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="Serial Numbers" />
          <Table.Column dataIndex="title" title="Listed Tags For The Post" />
          <Table.Column<ITags>
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
              label="Tags"
              name={['tags', 'id']}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                style={{ minWidth: 200 }}
                mode="multiple"
                placeholder="Select Tags"
                {...tagsSelectProps}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Modal {...createModalProps}>
          <Form {...createFormProps} layout="vertical">
            <Form.Item
              label="Tags"
              name={['tags', 'id']}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select {...tagsSelectProps} />
            </Form.Item>
          </Form>
        </Modal>
      </List>
    </div>
  );
};
