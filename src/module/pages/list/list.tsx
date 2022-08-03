import { useMany } from '@pankod/refine-core';
import {
  List,
  TextField,
  TagField,
  DateField,
  Table,
  useTable,
  FilterDropdown,
  Select,
  ShowButton,
  useSelect,
  Space,
  EditButton,
  DeleteButton,
  getDefaultSortOrder,
  useModalForm,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Icons,
} from '@pankod/refine-antd';

import { IPost, ICategory } from '../../interfaces';

export const PostList: React.FC = () => {
  const { tableProps, sorter } = useTable<IPost>();

  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];

  const { data: categoriesData, isLoading } = useMany<ICategory>({
    resource: 'categories',
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  const { modalProps, formProps, show, id, queryResult } = useModalForm<IPost>({
    action: 'edit',
  });

  const {
    modalProps: createModalProps,
    formProps: createFormProps,
    show: createShow,
  } = useModalForm<IPost>({
    action: 'create',
  });

  const { selectProps: categorySelectProps } = useSelect<IPost>({
    resource: 'categories',
    defaultValue: queryResult?.data?.data.category.id,
  });

  return (
    <div style={{ overflowY: 'scroll', height: '100vh' }}>
      <List createButtonProps={{ onClick: () => createShow() }}>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="title"
            title="title"
            sorter
            defaultSortOrder={getDefaultSortOrder('id', sorter)}
          />
          <Table.Column
            dataIndex="status"
            title="status"
            render={(value) => {
              if (value === 'published') {
                return (
                  <TagField
                    value={value}
                    style={{ backgroundColor: 'green', color: 'white' }}
                  />
                );
              } else if (value === 'draft') {
                return (
                  <TagField
                    value={value}
                    style={{ backgroundColor: 'blue', color: 'white' }}
                  />
                );
              } else
                return (
                  <TagField
                    value={value}
                    style={{ backgroundColor: 'red', color: 'white' }}
                  />
                );
            }}
          />
          <Table.Column
            dataIndex="status"
            title="Active/Inactive"
            render={(value) => {
              if (value === 'published') {
                return <Icons.CheckCircleTwoTone twoToneColor="#52c41a" />;
              } else if (value === 'draft') {
                return <Icons.CheckCircleTwoTone twoToneColor="blue" />;
              } else return <Icons.CloseCircleTwoTone twoToneColor="red" />;
            }}
          />
          <Table.Column
            dataIndex="createdAt"
            title="createdAt"
            render={(value) => <DateField format="LLL" value={value} />}
          />
          <Table.Column
            dataIndex={['category', 'id']}
            title="category"
            render={(value) => {
              if (isLoading) {
                return <TextField value="Loading..." />;
              }
              return (
                <TextField
                  value={
                    categoriesData?.data.find((item) => item.id === value)
                      ?.title
                  }
                />
              );
            }}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Select
                  style={{ minWidth: 200 }}
                  mode="multiple"
                  placeholder="Select Category"
                  {...categorySelectProps}
                />
              </FilterDropdown>
            )}
          />
          <Table.Column<IPost>
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
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        label: 'Published',
                        value: 'published',
                      },
                      {
                        label: 'Draft',
                        value: 'draft',
                      },
                      {
                        label: 'Rejected',
                        value: 'rejected',
                      },
                    ]}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal {...createModalProps}>
          <Form {...createFormProps} layout="vertical">
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    options={[
                      {
                        label: 'Published',
                        value: 'published',
                      },
                      {
                        label: 'Draft',
                        value: 'draft',
                      },
                      {
                        label: 'Rejected',
                        value: 'rejected',
                      },
                    ]}
                  ></Select>
                </Form.Item>
              </Col>
              <Col span={12}>
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
              </Col>
            </Row>
          </Form>
        </Modal>
      </List>
    </div>
  );
};
