import {
  Layout,
  Row,
  Col,
  Card,
  Table,
  Button,
  Switch,
  Typography,
  Tag,
  Space,
  Popconfirm,
  App,
  Modal,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styles from "../../styles/JobEmployerPage.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth.context";
import useGetEmployerByUserId from "../../features/employer/hooks/useGetEmployerByUserId";
import useGetJobPostsByEmployerId from "../../features/postjob/hooks/Job_Post/useGetJobPostsByEmployerId";
import useUpdateStatusJobPost from "../../features/postjob/hooks/Job_Post/useUpdateStatusJobPost";
import useDeleteJobPost from "../../features/postjob/hooks/Job_Post/useDeleteJobPost";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Title, Text } = Typography;

const JobEmployerPage = () => {
  const { message } = App.useApp();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: employer } = useGetEmployerByUserId(auth?.user?.id);
  const employerId = employer?.data?._id;

  const { data: jobsData, isLoading } = useGetJobPostsByEmployerId(employerId);
  const { mutate: updateStatusJobPost, isLoading: isUpdating } =
    useUpdateStatusJobPost();
  const { mutate: deleteJobPost, isLoading: isDeleting } = useDeleteJobPost();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  if (isLoading) return;

  // Chuyển đổi dữ liệu từ API sang định dạng phù hợp với Table
  const jobs =
    jobsData
      ?.map((job) => {
        const expiryDate = new Date(job?.expired_date);
        const postDate = new Date(job?.createdAt);
        const today = new Date();
        const daysLeft = Math.ceil(
          (expiryDate - today) / (1000 * 60 * 60 * 24)
        );

        return {
          id: job?._id,
          title: job?.title,
          location: `${job?.locations[0]?.address}, ${job?.locations[0]?.province}`,
          postDate: postDate.toLocaleDateString("vi-VN"),
          expiryDate: expiryDate.toLocaleDateString("vi-VN"),
          status: job?.status,
          daysLeft,
          createdAt: postDate,
          description: job?.description,
          salary_type: job?.salary_type,
          min_salary_range: job?.min_salary_range,
          max_salary_range: job?.max_salary_range,
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt) || [];

  const showConfirmModal = (jobId, checked) => {
    setSelectedJobId(jobId);
    setSelectedStatus(checked ? "active" : "inactive");
    setIsModalVisible(true);
  };

  const handleStatusChange = () => {
    updateStatusJobPost(
      { id: selectedJobId, status: selectedStatus },
      {
        onSuccess: () => {
          message.success(
            selectedStatus === "active"
              ? "Đã hiển thị việc làm"
              : "Đã ẩn việc làm"
          );
          setIsModalVisible(false);
        },
        onError: () => {
          message.error("Cập nhật trạng thái thất bại");
          setIsModalVisible(false);
        },
      }
    );
  };

  const handleView = (job) => {
    navigate(`/employer/jobpost/${job.id}`);
  };

  const handleDelete = (jobId) => {
    deleteJobPost(jobId, {
      onSuccess: () => {
        message.success("Đã xóa công việc thành công");
      },
      onError: () => {
        message.error("Xóa công việc thất bại");
      },
    });
  };

  const getExpiryStatus = (daysLeft) => {
    if (daysLeft <= 0) {
      return { color: "red", text: "Hết hạn" };
    }
    if (daysLeft <= 7) {
      return { color: "orange", text: `${daysLeft} ngày còn lại` };
    }
    return { color: "green", text: `${daysLeft} ngày còn lại` };
  };

  const columns = [
    {
      title: "Vị trí tuyển dụng",
      dataIndex: "title",
      key: "title",
      width: "35%",
      render: (text, record) => {
        const expiryStatus = getExpiryStatus(record.daysLeft);
        return (
          <div className={styles.jobInfo}>
            <Text strong className={styles.jobTitle}>
              {text}
            </Text>
            <div className={styles.locationInfo}>
              <EnvironmentOutlined className={styles.locationIcon} />
              <Text type="secondary">{record.location}</Text>
            </div>
            <Tag color={expiryStatus.color} className={styles.expiryTag}>
              {expiryStatus.text}
            </Tag>
            <div className={styles.dateInfo}>
              <div className={styles.dateItem}>
                <CalendarOutlined className={styles.dateIcon} />
                <Text type="secondary">Ngày đăng: {record.postDate}</Text>
              </div>
              <div className={styles.dateItem}>
                <CalendarOutlined className={styles.dateIcon} />
                <Text type="secondary">Hết hạn: {record.expiryDate}</Text>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (_, record) => (
        <div className={styles.statusControl}>
          <Switch
            checked={record.status === "active"}
            onChange={(checked) => showConfirmModal(record.id, checked)}
            checkedChildren="Hiển thị"
            unCheckedChildren="Ẩn"
            className={styles.statusSwitch}
            disabled={isUpdating}
          />
          <div className={styles.statusText}>
            <Text type={record.status === "active" ? "success" : "secondary"}>
              {record.status === "active" ? "Hiển thị việc làm" : "Ẩn việc làm"}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Thao tác",
      dataIndex: "actions",
      key: "actions",
      width: "15%",
      render: (_, record) => (
        <Space size="small" className={styles.actionButtons}>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => handleView(record)}
            className={styles.editButton}
          >
            Xem
          </Button>
          <Popconfirm
            title="Xóa công việc"
            description="Bạn có chắc chắn muốn xóa công việc này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            okType="danger"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
              className={styles.deleteButton}
              loading={isDeleting}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row
        gutter={[24, 24]}
        style={{
          background: "#fff",
          borderRadius: "24px",
        }}
        justify={"center"}
      >
        <Col span={21}>
          <Card className={styles.jobCard}>
            <div className={styles.cardHeader}>
              <Title level={2} className={styles.pageTitle}>
                Danh sách việc làm
              </Title>
              <Text type="secondary" className={styles.jobCount}>
                Tổng cộng: {jobs.length} việc làm
              </Text>
            </div>

            <Table
              columns={columns}
              dataSource={jobs}
              rowKey="id"
              className={styles.jobTable}
              scroll={{ x: 800 }}
            />
          </Card>
        </Col>
      </Row>

      <Modal
        title="Xác nhận thay đổi trạng thái"
        open={isModalVisible}
        onOk={handleStatusChange}
        onCancel={() => setIsModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy"
        confirmLoading={isUpdating}
      >
        <p>
          Bạn có chắc chắn muốn{" "}
          {selectedStatus === "active" ? "hiển thị" : "ẩn"} tin này?
        </p>
      </Modal>
    </>
  );
};

export default JobEmployerPage;
