import {
  Table,
  Button,
  Typography,
  Space,
  Popconfirm,
  Tag,
  Input,
  Select,
  Card,
  Avatar,
  Tooltip,
  Modal,
  Descriptions,
} from "antd";
import styled from "styled-components";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  MailOutlined,
  FilterOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useGetListUser from "../../features/auth/hooks/useGetListUser";
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

const FilterSection = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .ant-card-body {
    padding: 20px;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
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

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.div`
  font-weight: 600;
  color: #262626;
  font-size: 14px;
`;

const UserEmail = styled.div`
  color: #8c8c8c;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActionButton = styled(Button)`
  &.view-btn {
    color: #52c41a;
    border-color: #52c41a;
    background: #f6ffed;

    &:hover {
      background: #52c41a;
      color: #ffffff;
      border-color: #52c41a;
    }
  }

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

const RoleTag = styled(Tag)`
  border-radius: 20px;
  border: none;
  font-weight: 500;
  padding: 4px 12px;

  &.candidate {
    background: #f0f7ff;
    color: #1890ff;
  }

  &.employer {
    background: #fff7e6;
    color: #fa8c16;
  }

  &.admin {
    background: #f6ffed;
    color: #52c41a;
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

const AdminAccountManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], isLoading } = useGetListUser();
  const tableData = users.map((user, index) => ({
    key: user._id,
    id: index + 1,
    email: user.email,
    full_name: user.full_name,
    gender: user.gender,
    phone_number: user.phone_number,
    date_of_birth: user.date_of_birth,
    role: user.role,
    avatar: user.avatar,
    created_at: dayjs(user.createdAt).format("DD/MM/YYYY"),
  }));

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const getRoleTag = (role) => {
    const roleMap = {
      candidate: { text: "Ứng viên", className: "candidate" },
      employer: { text: "Nhà tuyển dụng", className: "employer" },
      admin: { text: "Quản trị viên", className: "admin" },
    };

    const roleInfo = roleMap[role] || { text: role, className: "candidate" };
    return <RoleTag className={roleInfo.className}>{roleInfo.text}</RoleTag>;
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Thông tin người dùng",
      key: "user_info",
      width: 300,
      render: (_, record) => (
        <UserInfo>
          <Avatar size={40} src={record.avatar} icon={<UserOutlined />} />
          <UserDetails>
            <UserName>{record.full_name}</UserName>
            <UserEmail>
              <MailOutlined />
              {record.email}
            </UserEmail>
          </UserDetails>
        </UserInfo>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      width: 150,
      render: (role) => getRoleTag(role),
      filters: [
        { text: "Ứng viên", value: "candidate" },
        { text: "Nhà tuyển dụng", value: "employer" },
        { text: "Quản trị viên", value: "admin" },
      ],
      onFilter: (value, record) => record.role === value,
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
      width: 150,
      render: (_, record) => (
        <Space size={8}>
          <Tooltip title="Xem chi tiết">
            <ActionButton
              className="view-btn"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <ActionButton
              className="edit-btn"
              icon={<EditOutlined />}
              size="small"
            />
          </Tooltip>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc muốn xóa tài khoản này?"
            okText="Xóa"
            cancelText="Hủy"
            okType="danger"
          >
            <Tooltip title="Xóa">
              <ActionButton
                className="delete-btn"
                icon={<DeleteOutlined />}
                size="small"
              />
            </Tooltip>
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
            <PageTitle>Quản lý tài khoản</PageTitle>
            <PageSubtitle>
              Quản lý thông tin người dùng trong hệ thống
            </PageSubtitle>
          </HeaderLeft>
          {/* <HeaderActions>
            <PrimaryButton type="primary" icon={<PlusOutlined />}>
              Thêm tài khoản
            </PrimaryButton>
          </HeaderActions> */}
        </PageHeader>

        {/* <FilterSection>
          <FilterRow>
            <Search
              placeholder="Tìm kiếm theo tên hoặc email..."
              allowClear
              style={{ width: 300 }}
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="Lọc theo vai trò"
              style={{ width: 200 }}
              allowClear
              suffixIcon={<FilterOutlined />}
            >
              <Option value="candidate">Ứng viên</Option>
              <Option value="employer">Nhà tuyển dụng</Option>
              <Option value="admin">Quản trị viên</Option>
            </Select>
            <Select placeholder="Trạng thái" style={{ width: 150 }} allowClear>
              <Option value="active">Hoạt động</Option>
              <Option value="inactive">Đã khóa</Option>
            </Select>
          </FilterRow>
        </FilterSection> */}

        <StyledTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} tài khoản`,
          }}
          scroll={{ x: 1000 }}
        />
      </ContentWrapper>
      <Modal
        title="Thông tin chi tiết người dùng"
        open={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedUser && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Avatar">
              <Avatar src={selectedUser.avatar} size={64} />
            </Descriptions.Item>
            <Descriptions.Item label="Họ và tên">
              {selectedUser.full_name}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedUser.email}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {selectedUser.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label="Giới tính">
              {selectedUser.gender === "male" ? "Nam" : "Nữ"}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày sinh">
              {dayjs(selectedUser.date_of_birth).format("DD/MM/YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Vai trò">
              {getRoleTag(selectedUser.role)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo tài khoản">
              {dayjs(selectedUser.createdAt).format("DD/MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </PageContainer>
  );
};

export default AdminAccountManagementPage;
