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
import useGetJobPositions from "../../features/postjob/hooks/Job_Position/useGetJobPositions";
import useCreateJobPosition from "../../features/postjob/hooks/Job_Position/useCreateJobPosition";
import useUpdateJobPosition from "../../features/postjob/hooks/Job_Position/useUpdateJobPosition";
import useDeleteJobPosition from "../../features/postjob/hooks/Job_Position/useDeleteJobPosition";
import useGetIndustries from "../../features/postjob/hooks/Industry/useGetIndustries";
import dayjs from "dayjs";
import { useState } from "react";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const PageContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  padding: 0;
  margin: -32px;
  border-radius: 24px;
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

const PositionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const PositionDetails = styled.div`
  flex: 1;
`;

const PositionName = styled.div`
  font-weight: 600;
  color: #262626;
  font-size: 15px;
  margin-bottom: 4px;
`;

const PositionDescription = styled.div`
  color: #8c8c8c;
  font-size: 13px;
  line-height: 1.4;
  max-width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

const AdminPositionManagementPage = () => {
  const { message } = App.useApp();
  const { data: jobPositions = [], isLoading: isLoadingPositions } =
    useGetJobPositions();
  const { data: industries = [], isLoading: isLoadingIndustries } =
    useGetIndustries();
  const { mutate: createJobPosition, isLoading: isCreating } =
    useCreateJobPosition();
  const { mutate: updateJobPosition, isLoading: isUpdating } =
    useUpdateJobPosition();
  const { mutate: deleteJobPosition, isLoading: isDeleting } =
    useDeleteJobPosition();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingPosition, setEditingPosition] = useState(null);

  const handleAdd = () => {
    setEditingPosition(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingPosition(record);
    form.setFieldsValue({
      name: record.name,
      industry_id: record.industry_id?._id,
      status: record.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    deleteJobPosition(id, {
      onSuccess: () => {
        message.success("Xóa vị trí tuyển dụng thành công");
      },
      onError: (error) => {
        message.error(error.message || "Xóa vị trí tuyển dụng thất bại");
      },
    });
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingPosition) {
          updateJobPosition(
            { id: editingPosition.key, data: values },
            {
              onSuccess: () => {
                message.success("Cập nhật vị trí tuyển dụng thành công");
                setIsModalOpen(false);
                form.resetFields();
              },
              onError: (error) => {
                message.error(
                  error.message || "Cập nhật vị trí tuyển dụng thất bại"
                );
              },
            }
          );
        } else {
          createJobPosition(values, {
            onSuccess: () => {
              message.success("Thêm vị trí tuyển dụng thành công");
              setIsModalOpen(false);
              form.resetFields();
            },
            onError: (error) => {
              message.error(error.message || "Thêm vị trí tuyển dụng thất bại");
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

  const tableData = jobPositions.map((position, index) => ({
    key: position._id,
    id: index + 1,
    name: position.name,
    industry_id: position.industry_id,
    status: position.status,
    created_at: dayjs(position.createdAt).format("DD/MM/YYYY"),
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
      title: "Tên vị trí",
      key: "position_info",
      width: 300,
      render: (_, record) => (
        <PositionInfo>
          <PositionDetails>
            <PositionName>{record.name}</PositionName>
            <PositionDescription>
              Ngành: {record.industry_id?.name || "Chưa xác định"}
            </PositionDescription>
          </PositionDetails>
        </PositionInfo>
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
            description="Bạn có chắc muốn xóa vị trí này?"
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
            <PageTitle>Quản lý vị trí tuyển dụng</PageTitle>
            <PageSubtitle>
              Quản lý danh mục các vị trí tuyển dụng trong hệ thống
            </PageSubtitle>
          </HeaderLeft>
          <HeaderActions>
            <PrimaryButton
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAdd}
            >
              Thêm vị trí
            </PrimaryButton>
          </HeaderActions>
        </PageHeader>

        <StyledTable
          columns={columns}
          dataSource={tableData}
          loading={isLoadingPositions || isCreating || isUpdating || isDeleting}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} vị trí`,
          }}
          scroll={{ x: 1000 }}
        />

        <Modal
          title={
            editingPosition
              ? "Chỉnh sửa vị trí tuyển dụng"
              : "Thêm vị trí tuyển dụng"
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText={editingPosition ? "Cập nhật" : "Thêm"}
          cancelText="Hủy"
          confirmLoading={isCreating || isUpdating}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Tên vị trí"
              rules={[{ required: true, message: "Vui lòng nhập tên vị trí" }]}
            >
              <AntInput placeholder="Nhập tên vị trí" />
            </Form.Item>
            <Form.Item
              name="industry_id"
              label="Ngành nghề"
              rules={[{ required: true, message: "Vui lòng chọn ngành nghề" }]}
            >
              <Select
                placeholder="Chọn ngành nghề"
                loading={isLoadingIndustries}
                showSearch
                optionFilterProp="children"
              >
                {industries.map((industry) => (
                  <Option key={industry._id} value={industry._id}>
                    {industry.name}
                  </Option>
                ))}
              </Select>
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

export default AdminPositionManagementPage;
