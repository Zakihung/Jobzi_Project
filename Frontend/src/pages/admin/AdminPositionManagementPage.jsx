import {
  Table,
  Button,
  Typography,
  Space,
  Popconfirm,
  Tag,
  Input,
  Card,
  Avatar,
  Tooltip,
  Badge,
} from "antd";
import styled from "styled-components";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  UserOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import useGetJobPositions from "../../features/postjob/hooks/Job_Position/useGetJobPositions";
import dayjs from "dayjs";

const { Title } = Typography;
const { Search } = Input;

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

const FilterSection = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .ant-card-body {
    padding: 20px;
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

const StatsCard = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const StatItem = styled(Card)`
  flex: 1;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .ant-card-body {
    padding: 20px;
    text-align: center;
  }
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1890ff;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: #8c8c8c;
  font-size: 14px;
`;

const AdminPositionManagementPage = () => {
  const { data: jobPositions = [], isLoading } = useGetJobPositions();

  const tableData = jobPositions.map((position, index) => ({
    key: position._id,
    id: index + 1,
    name: position.name,
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
          under_review: { color: "orange", text: "Chờ duyệt" },
        };

        const tag = statusMap[status] || { color: "default", text: status };
        return <Tag color={tag.color}>{tag.text}</Tag>;
      },
    },
    // {
    //   title: "Số lượng việc làm",
    //   dataIndex: "job_count",
    //   key: "job_count",
    //   width: 150,
    //   sorter: (a, b) => a.job_count - b.job_count,
    //   render: (count) => (
    //     <Badge count={count} style={{ backgroundColor: "#52c41a" }} showZero />
    //   ),
    // },
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
      render: () => (
        <Space size={8}>
          <Tooltip title="Chỉnh sửa">
            <ActionButton
              className="edit-btn"
              icon={<EditOutlined />}
              size="small"
            />
          </Tooltip>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc muốn xóa vị trí này?"
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
            <PageTitle>Quản lý vị trí tuyển dụng</PageTitle>
            <PageSubtitle>
              Quản lý danh mục các vị trí tuyển dụng trong hệ thống
            </PageSubtitle>
          </HeaderLeft>
          {/* <HeaderActions>
            <PrimaryButton type="primary" icon={<PlusOutlined />}>
              Thêm vị trí
            </PrimaryButton>
          </HeaderActions> */}
        </PageHeader>

        {/* <StatsCard>
          <StatItem>
            <StatNumber>{data.length}</StatNumber>
            <StatLabel>Tổng vị trí</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>
              {data.filter((item) => item.status === "active").length}
            </StatNumber>
            <StatLabel>Đang hoạt động</StatLabel>
          </StatItem>
          <StatItem>
            <StatNumber>
              {data.reduce((sum, item) => sum + (item.job_count || 0), 0)}
            </StatNumber>
            <StatLabel>Tổng việc làm</StatLabel>
          </StatItem>
        </StatsCard> */}

        {/* <FilterSection>
          <Search
            placeholder="Tìm kiếm vị trí tuyển dụng..."
            allowClear
            style={{ width: 400 }}
            prefix={<SearchOutlined />}
            size="large"
          />
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
              `${range[0]}-${range[1]} của ${total} vị trí`,
          }}
          scroll={{ x: 1000 }}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default AdminPositionManagementPage;
