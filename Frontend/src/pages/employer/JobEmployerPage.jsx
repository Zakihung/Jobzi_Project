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
  message,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styles from "../../styles/JobEmployerPage.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import useGetEmployerByUserId from "../../features/employer/hooks/useGetEmployerByUserId";
import useGetJobPostsByEmployerId from "../../features/postjob/hooks/Job_Post/useGetJobPostsByEmployerId";

const { Content } = Layout;
const { Title, Text } = Typography;

const JobEmployerPage = () => {
  const { auth } = useContext(AuthContext);
  const { data: employer } = useGetEmployerByUserId(auth?.user?.id);
  const employerId = employer?.data?._id;

  const { data: jobsData, isLoading } = useGetJobPostsByEmployerId(employerId);

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
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt) || [];

  //   const [jobs, setJobs] = useState([
  //     {
  //       id: 1,
  //       title: "Frontend Developer - React.js",
  //       location: "Quận 1, TP. Hồ Chí Minh",
  //       postDate: "15/06/2025",
  //       expiryDate: "28/06/2025",
  //       status: "active",
  //       daysLeft: 2,
  //     },
  //     {
  //       id: 2,
  //       title: "Backend Developer - Node.js",
  //       location: "Quận 3, TP. Hồ Chí Minh",
  //       postDate: "10/06/2025",
  //       expiryDate: "25/06/2025",
  //       status: "active",
  //       daysLeft: -1,
  //     },
  //     {
  //       id: 3,
  //       title: "Product Manager",
  //       location: "Cầu Giấy, Hà Nội",
  //       postDate: "20/06/2025",
  //       expiryDate: "08/07/2025",
  //       status: "inactive",
  //       daysLeft: 12,
  //     },
  //     {
  //       id: 4,
  //       title: "UI/UX Designer",
  //       location: "Hai Châu, Đà Nẵng",
  //       postDate: "12/06/2025",
  //       expiryDate: "30/06/2025",
  //       status: "active",
  //       daysLeft: 4,
  //     },
  //   ]);

  const handleStatusChange = (jobId, checked) => {
    // Cập nhật trạng thái job (cần thêm API để cập nhật trạng thái)
    message.success(checked ? "Đã hiển thị việc làm" : "Đã ẩn việc làm");
  };

  const handleEdit = (jobId) => {
    message.info(`Chỉnh sửa công việc #${jobId}`);
    // Implement edit logic here (cần thêm API để chỉnh sửa)
  };

  const handleDelete = () => {
    // Xóa job (cần thêm API để xóa)
    message.success("Đã xóa công việc thành công");
  };

  const getExpiryStatus = (daysLeft) => {
    if (daysLeft < 0) {
      return {
        text: "Đã hết hạn",
        color: "red",
      };
    } else if (daysLeft <= 5) {
      return {
        text: `Hết hạn trong ${daysLeft} ngày`,
        color: "orange",
      };
    } else {
      return {
        text: `Hết hạn trong ${daysLeft} ngày`,
        color: "green",
      };
    }
  };

  const columns = [
    {
      title: "Thông tin",
      dataIndex: "info",
      key: "info",
      width: "40%",
      render: (_, record) => (
        <div className={styles.jobInfo}>
          <Title level={5} className={styles.jobTitle}>
            {record.title}
          </Title>
          <div className={styles.jobLocation}>
            <EnvironmentOutlined className={styles.locationIcon} />
            <Text type="secondary">{record.location}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expiry",
      key: "expiry",
      width: "25%",
      render: (_, record) => {
        const expiryStatus = getExpiryStatus(record.daysLeft);
        return (
          <div className={styles.expiryInfo}>
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
            onChange={(checked) => handleStatusChange(record.id, checked)}
            checkedChildren="Hiển thị"
            unCheckedChildren="Ẩn"
            className={styles.statusSwitch}
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
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record.id)}
            className={styles.editButton}
          >
            Sửa
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
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
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
            //   pagination={{
            //     pageSize: 10,
            //     showSizeChanger: true,
            //     showQuickJumper: true,
            //     showTotal: (total, range) =>
            //       `${range[0]}-${range[1]} của ${total} việc làm`,
            //   }}
            className={styles.jobTable}
            scroll={{ x: 800 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default JobEmployerPage;
