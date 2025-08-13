import {
  Table,
  Button,
  Typography,
  Space,
  Popconfirm,
  Tag,
  Input,
  Card,
  Modal,
  Form,
  Input as AntInput,
  Select,
  App,
} from "antd";
import styled from "styled-components";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import useGetIndustryGroups from "../../features/postjob/hooks/Industry_Group/useGetIndustryGroups";
import useCreateIndustryGroup from "../../features/postjob/hooks/Industry_Group/useCreateIndustryGroup";
import useUpdateIndustryGroup from "../../features/postjob/hooks/Industry_Group/useUpdateIndustryGroup";
import useDeleteIndustryGroup from "../../features/postjob/hooks/Industry_Group/useDeleteIndustryGroup";
import dayjs from "dayjs";
import { useState } from "react";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const PageContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 0;
  border-radius: 24px;
  margin: -32px;
`;

const ContentWrapper = styled.div`
  padding: 32px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const PageTitle = styled(Title)`
  margin: 0 !important;
  color: #262626;
  font-size: 28px !important;
  font-weight: 600 !important;
`;

const PageSubtitle = styled.p`
  color: #8c8c8c;
  margin: 8px 0 0 0;
  font-size: 16px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;
  }
`;

const StyledTable = styled(Table)`
  .ant-table {
    background: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  }

  .ant-table-thead > tr > th {
    background: #fafafa;
    border-bottom: 2px solid #f0f0f0;
    font-weight: 600;
    color: #262626;
    padding: 16px;
  }

  .ant-table-tbody > tr > td {
    padding: 16px;
    border-bottom: 1px solid #f5f5f5;
  }

  .ant-table-tbody > tr:hover > td {
    background: #f8f9fa;
  }
`;

const IndustryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IndustryDetails = styled.div`
  flex: 1;
`;

const IndustryName = styled.div`
  font-weight: 600;
  color: #262626;
  font-size: 15px;
  margin-bottom: 4px;
`;

const ActionButton = styled(Button)`
  &.edit-btn {
    color: #1890ff;
    border-color: #1890ff;
    background: #f0f7ff;

    &:hover {
      background: #1890ff;
      color: #ffffff;
      border-color: #1890ff;
    }
  }

  &.delete-btn {
    color: #ff4d4f;
    border-color: #ff4d4f;
    background: #fff2f0;

    &:hover {
      background: #ff4d4f;
      color: #ffffff;
      border-color: #ff4d4f;
    }
  }
`;

const PrimaryButton = styled(Button)`
  background: #1890ff;
  border-color: #1890ff;
  border-radius: 8px;
  font-weight: 500;
  height: 40px;
  padding: 0 20px;

  &:hover {
    background: #40a9ff;
    border-color: #40a9ff;
  }
`;

const AdminIndustryManagementPage = () => {
  const { message } = App.useApp();
  const { data: industryGroups = [], isLoading } = useGetIndustryGroups();
  const { mutate: createIndustryGroup, isLoading: isCreating } =
    useCreateIndustryGroup();
  const { mutate: updateIndustryGroup, isLoading: isUpdating } =
    useUpdateIndustryGroup();
  const { mutate: deleteIndustryGroup, isLoading: isDeleting } =
    useDeleteIndustryGroup();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingIndustry, setEditingIndustry] = useState(null);

  const handleAdd = () => {
    setEditingIndustry(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingIndustry(record);
    form.setFieldsValue({
      name: record.name,
      status: record.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteIndustryGroup(id, {
      onSuccess: () => {
        message.success("Xóa nhóm ngành nghề thành công");
      },
      onError: (error) => {
        message.error(error.message || "Xóa nhóm ngành nghề thất bại");
      },
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingIndustry) {
          updateIndustryGroup(
            { id: editingIndustry.key, data: values },
            {
              onSuccess: () => {
                message.success("Cập nhật nhóm ngành nghề thành công");
                setIsModalOpen(false);
                form.resetFields();
              },
              onError: (error) => {
                message.error(
                  error.message || "Cập nhật nhóm ngành nghề thất bại"
                );
              },
            }
          );
        } else {
          createIndustryGroup(values, {
            onSuccess: () => {
              message.success("Thêm nhóm ngành nghề thành công");
              setIsModalOpen(false);
              form.resetFields();
            },
            onError: (error) => {
              message.error(error.message || "Thêm nhóm ngành nghề thất bại");
            },
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const tableData = industryGroups.map((industry, index) => ({
    key: industry._id,
    id: index + 1,
    name: industry.name,
    status: industry.status,
    created_at: dayjs(industry.createdAt).format("DD/MM/YYYY"),
  }));

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Tên nhóm ngành nghề",
      key: "industry_info",
      width: 300,
      render: (_, record) => (
        <IndustryInfo>
          <IndustryDetails>
            <IndustryName>{record.name}</IndustryName>
          </IndustryDetails>
        </IndustryInfo>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => {
        const statusMap = {
          open: { color: "green", text: "Đang mở" },
          closed: { color: "red", text: "Đã đóng" },
        };

        const tag = statusMap[status] || { color: "default", text: status };
        return <Tag color={tag.color}>{tag.text}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      width: 130,
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    },
    {
      title: "Hành động",
      key: "action",
      width: 180,
      render: (_, record) => (
        <Space size={8}>
          <ActionButton
            className="edit-btn"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          ></ActionButton>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc muốn xóa nhóm ngành nghề này?"
            okText="Xóa"
            cancelText="Hủy"
            okType="danger"
            onConfirm={() => handleDelete(record.key)}
          >
            <ActionButton
              className="delete-btn"
              icon={<DeleteOutlined />}
              size="small"
            ></ActionButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <HeaderLeft>
            <PageTitle>Quản lý ngành nghề</PageTitle>
            <PageSubtitle>
              Quản lý danh mục các nhóm ngành nghề trong hệ thống
            </PageSubtitle>
          </HeaderLeft>
          <HeaderActions>
            <PrimaryButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Thêm ngành nghề
            </PrimaryButton>
          </HeaderActions>
        </PageHeader>

        <StyledTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isCreating || isUpdating || isDeleting}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} nhóm ngành nghề`,
          }}
          scroll={{ x: 1000 }}
        />

        <Modal
          title={
            editingIndustry
              ? "Chỉnh sửa nhóm ngành nghề"
              : "Thêm nhóm ngành nghề"
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={editingIndustry ? "Cập nhật" : "Thêm"}
          cancelText="Hủy"
          confirmLoading={isCreating || isUpdating}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Tên nhóm ngành nghề"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên nhóm ngành nghề",
                },
              ]}
            >
              <AntInput placeholder="Nhập tên nhóm ngành nghề" />
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng thái"
              rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
            >
              <Select placeholder="Chọn trạng thái">
                <Option value="open">Đang mở</Option>
                <Option value="closed">Đã đóng</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </ContentWrapper>
    </PageContainer>
  );
};

export default AdminIndustryManagementPage;
