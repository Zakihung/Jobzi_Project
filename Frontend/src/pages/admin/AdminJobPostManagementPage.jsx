import {
  Table,
  Button,
  Typography,
  Space,
  Popconfirm,
  Tag,
  Card,
  Avatar,
  Tooltip,
  Badge,
  Modal,
  Descriptions,
  Form,
  Input as AntInput,
  Select,
  DatePicker,
} from "antd";
import styled from "styled-components";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusOutlined,
  EyeOutlined,
  FilterOutlined,
  CalendarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import useGetAllJobPosts from "../../features/postjob/hooks/Job_Post/useGetAllJobPosts";
import useGetListCompany from "../../features/company/hooks/Company/useGetListCompany";
import useUpdateJobPost from "../../features/postjob/hooks/Job_Post/useUpdateJobPost";
import useDeleteJobPost from "../../features/postjob/hooks/Job_Post/useDeleteJobPost";
import dayjs from "dayjs";
import { useState } from "react";

const { Title } = Typography;
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

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const JobTitle = styled.div`
  font-weight: 600;
  color: #262626;
  font-size: 15px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #8c8c8c;
  font-size: 13px;
`;

const JobDetails = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #8c8c8c;
  font-size: 12px;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
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
 `;

const StatusTag = styled(Tag)`
  border-radius: 20px;
  border: none;
  font-weight: 500;
  padding: 4px 12px;

  &.active {
    background: #f6ffed;
    color: #52c41a;
  }

  &.expired {
    background: #fff2f0;
    color: #ff4d4f;
  }

  &.pending {
    background: #fff7e6;
    color: #fa8c16;
  }
`;

const PriorityTag = styled(Tag)`
  border-radius: 6px;
  font-size: 11px;
  padding: 2px 8px;

  &.urgent {
    background: #ff4d4f;
    color: #ffffff;
    border: none;
  }

  &.normal {
    background: #52c41a;
    color: #ffffff;
    border: none;
  }
`;

const PrimaryButton = styled(Button)`
  background: #1890ff;
  border-color: #1890ff;
  border-radius: 8px;
  font-weight:  Ascending
  font-size: 14px;
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

const AdminJobPostManagementPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form] = Form.useForm();

  const { data: jobPosts = [], isLoading } = useGetAllJobPosts();
  const { data: companies = [] } = useGetListCompany();
  const { mutate: updateJobPost, isLoading: isUpdating } = useUpdateJobPost();
  const { mutate: deleteJobPost, isLoading: isDeleting } = useDeleteJobPost();

  const tableData = jobPosts.map((job, index) => {
    const company = companies.find(
      (c) => c._id === job?.employer_id?.company_id
    );

    return {
      key: job?._id,
      id: index + 1,
      title: job?.title,
      company: company?.name || "—",
      location: job?.locations?.[0]?.province || "—",
      salary:
        job?.salary_type === "negotiable"
          ? "Thỏa thuận"
          : `${(job?.min_salary_range / 1e6).toFixed(0)}–${(
              job?.max_salary_range / 1e6
            ).toFixed(0)} triệu`,
      status: job?.status,
      applicants: job?.applicants || 0,
      posted_date: dayjs(job?.createdAt).format("DD/MM/YYYY"),
      expiry_date: dayjs(job?.expired_date).format("DD/MM/YYYY"),
      description: job?.description,
      requirements: job?.requirements,
      benefits: job?.benefits,
      min_years_experience: job?.min_years_experience,
      education_level: job?.education_level,
      work_type: job?.work_type,
      recipient_email: job?.recipient_email,
      recipient_name: job?.recipient_name,
      recipient_phone_number: job?.recipient_phone_number,
    };
  });

  const getStatusTag = (status) => {
    const statusMap = {
      active: { text: "Đang tuyển", className: "active" },
      expired: { text: "Hết hạn", className: "expired" },
      pending: { text: "Chờ duyệt", className: "pending" },
    };

    const statusInfo = statusMap[status] || {
      text: status,
      className: "active",
    };
    return (
      <StatusTag className={statusInfo.className}>{statusInfo.text}</StatusTag>
    );
  };

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalVisible(true);
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    form.setFieldsValue({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      benefits: job.benefits,
      min_years_experience: job.min_years_experience,
      education_level: job.education_level,
      work_type: job.work_type,
      salary_type: job.salary_type || "negotiable",
      min_salary_range:
        job.salary_type === "range" ? job.min_salary_range : null,
      max_salary_range:
        job.salary_type === "range" ? job.max_salary_range : null,
      recipient_email: job.recipient_email,
      recipient_name: job.recipient_name,
      recipient_phone_number: job.recipient_phone_number,
      expired_date: dayjs(job.expiry_date, "DD/MM/YYYY"),
    });
    setIsEditModalVisible(true);
  };

  const handleUpdateJobPost = (values) => {
    updateJobPost(
      {
        id: selectedJob.key,
        data: {
          ...values,
          expired_date: values.expired_date.format("YYYY-MM-DD"),
        },
      },
      {
        onSuccess: () => {
          setIsEditModalVisible(false);
          setSelectedJob(null);
          form.resetFields();
        },
      }
    );
  };

  const handleDelete = (id) => {
    deleteJobPost(id, {
      onSuccess: () => {
        setSelectedJob(null);
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedJob(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalVisible(false);
    setSelectedJob(null);
    form.resetFields();
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
      title: "Thông tin việc làm",
      key: "job_info",
      width: 350,
      render: (_, record) => (
        <JobInfo>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <JobTitle>{record.title}</JobTitle>
          </div>
          <CompanyInfo>{record.company}</CompanyInfo>
          <JobDetails>
            <DetailItem>
              <EnvironmentOutlined />
              {record.location}
            </DetailItem>
            <DetailItem>
              <DollarOutlined />
              {record.salary}
            </DetailItem>
          </JobDetails>
        </JobInfo>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 130,
      render: (status) => getStatusTag(status),
      filters: [
        { text: "Đang tuyển", value: "active" },
        { text: "Hết hạn", value: "expired" },
        { text: "Chờ duyệt", value: "pending" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Ngày đăng",
      dataIndex: "posted_date",
      key: "posted_date",
      width: 120,
      sorter: (a, b) => new Date(a.posted_date) - new Date(b.posted_date),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiry_date",
      key: "expiry_date",
      width: 120,
      sorter: (a, b) => new Date(a.expiry_date) - new Date(b.expiry_date),
    },
    {
      title: "Hành động",
      key: "action",
      width: 180,
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
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Xác nhận xóa"
            description="Bạn có chắc muốn xóa tin tuyển dụng này?"
            okText="Xóa"
            cancelText="Hủy"
            okType="danger"
            onConfirm={() => handleDelete(record.key)}
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
            <PageTitle>Quản lý tin tuyển dụng</PageTitle>
            <PageSubtitle>
              Quản lý các tin đăng tuyển dụng trong hệ thống
            </PageSubtitle>
          </HeaderLeft>
        </PageHeader>

        <StyledTable
          columns={columns}
          dataSource={tableData}
          loading={isLoading || isUpdating || isDeleting}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} tin tuyển dụng`,
          }}
          scroll={{ x: 1200 }}
        />
      </ContentWrapper>
      <Modal
        title="Chi tiết tin tuyển dụng"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={700}
      >
        {selectedJob && (
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="Tiêu đề">
              {selectedJob.title}
            </Descriptions.Item>
            <Descriptions.Item label="Công ty">
              {selectedJob.company}
            </Descriptions.Item>
            <Descriptions.Item label="Địa điểm">
              {selectedJob.location}
            </Descriptions.Item>
            <Descriptions.Item label="Mức lương">
              {selectedJob.salary}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              <div
                dangerouslySetInnerHTML={{ __html: selectedJob.description }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Yêu cầu">
              <div
                dangerouslySetInnerHTML={{ __html: selectedJob.requirements }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Phúc lợi">
              <div dangerouslySetInnerHTML={{ __html: selectedJob.benefits }} />
            </Descriptions.Item>
            <Descriptions.Item label="Kinh nghiệm tối thiểu">
              {selectedJob.min_years_experience} năm
            </Descriptions.Item>
            <Descriptions.Item label="Trình độ học vấn">
              {selectedJob.education_level}
            </Descriptions.Item>
            <Descriptions.Item label="Loại công việc">
              {selectedJob.work_type}
            </Descriptions.Item>
            <Descriptions.Item label="Email liên hệ">
              {selectedJob.recipient_email}
            </Descriptions.Item>
            <Descriptions.Item label="Người liên hệ">
              {selectedJob.recipient_name}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại liên hệ">
              {selectedJob.recipient_phone_number}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đăng">
              {selectedJob.posted_date}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày hết hạn">
              {selectedJob.expiry_date}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {getStatusTag(selectedJob.status)}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
      <Modal
        title="Chỉnh sửa tin tuyển dụng"
        visible={isEditModalVisible}
        onCancel={handleCloseEditModal}
        footer={[
          <Button key="cancel" onClick={handleCloseEditModal}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isUpdating}
            onClick={() => form.submit()}
          >
            Lưu
          </Button>,
        ]}
        width={700}
      >
        <Form form={form} onFinish={handleUpdateJobPost} layout="vertical">
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <AntInput.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="requirements"
            label="Yêu cầu"
            rules={[{ required: true, message: "Vui lòng nhập yêu cầu!" }]}
          >
            <AntInput.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="benefits"
            label="Phúc lợi"
            rules={[{ required: true, message: "Vui lòng nhập phúc lợi!" }]}
          >
            <AntInput.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="min_years_experience"
            label="Kinh nghiệm tối thiểu (năm)"
            rules={[{ required: true, message: "Vui lòng nhập kinh nghiệm!" }]}
          >
            <AntInput type="number" />
          </Form.Item>
          <Form.Item
            name="education_level"
            label="Trình độ học vấn"
            rules={[{ required: true, message: "Vui lòng nhập trình độ!" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="work_type"
            label="Loại công việc"
            rules={[
              { required: true, message: "Vui lòng chọn loại công việc!" },
            ]}
          >
            <Select>
              <Option value="full_time">Toàn thời gian</Option>
              <Option value="part_time">Bán thời gian</Option>
              <Option value="contract">Hợp đồng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="salary_type"
            label="Loại lương"
            rules={[{ required: true, message: "Vui lòng chọn loại lương!" }]}
          >
            <Select>
              <Option value="range">Khoảng</Option>
              <Option value="negotiable">Thỏa thuận</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.salary_type !== currentValues.salary_type
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("salary_type") === "range" ? (
                <>
                  <Form.Item
                    name="min_salary_range"
                    label="Mức lương tối thiểu"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lương tối thiểu!",
                      },
                    ]}
                  >
                    <AntInput type="number" />
                  </Form.Item>
                  <Form.Item
                    name="max_salary_range"
                    label="Mức lương tối đa"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập lương tối đa!",
                      },
                    ]}
                  >
                    <AntInput type="number" />
                  </Form.Item>
                </>
              ) : null
            }
          </Form.Item>
          <Form.Item
            name="recipient_email"
            label="Email liên hệ"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="recipient_name"
            label="Người liên hệ"
            rules={[
              { required: true, message: "Vui lòng nhập tên người liên hệ!" },
            ]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="recipient_phone_number"
            label="Số điện thoại liên hệ"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
            ]}
          >
            <AntInput />
          </Form.Item>
          <Form.Item
            name="expired_date"
            label="Ngày hết hạn"
            rules={[{ required: true, message: "Vui lòng chọn ngày hết hạn!" }]}
          >
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default AdminJobPostManagementPage;
