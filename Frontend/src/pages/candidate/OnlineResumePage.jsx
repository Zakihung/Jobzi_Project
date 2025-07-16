import React, { useState, useRef } from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Button,
  Avatar,
  Card,
  Modal,
  Form,
  Input,
  Select,
  Popover,
  Upload,
  Progress,
  List,
  Typography,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  PlusOutlined,
  FileTextOutlined,
  SearchOutlined,
  ClockCircleOutlined,
  StarOutlined,
  TeamOutlined,
  ProjectOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import styles from "../../styles/OnlineResumePage.module.css";

const { Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const OnlineResumePage = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [jobStatus, setJobStatus] = useState("Đang xem xét cơ hội mới");
  const [form] = Form.useForm();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "Nguyễn Phước Hưng",
    phone: "0123 456 789",
    age: 22,
    education: "Sinh viên",
    experience: "0 năm",
    email: "hung@example.com",
  });
  const [completedSections, setCompletedSections] = useState([
    "Thông tin cá nhân",
    "Trạng thái tìm việc",
  ]);
  const sectionRefs = {
    personalInfo: useRef(null),
    jobStatus: useRef(null),
    jobExpectation: useRef(null),
    education: useRef(null),
    highlights: useRef(null),
    workExperience: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
  };

  const allSections = [
    "Thông tin cá nhân",
    "Trạng thái tìm việc",
    "Mong muốn tìm việc",
    "Học vấn",
    "Điểm nổi bật",
    "Kinh nghiệm làm việc",
    "Kinh nghiệm dự án",
    "Năng lực chuyên môn",
  ];

  const jobStatusOptions = [
    "Đang xem xét cơ hội mới",
    "Có thể nhận việc ngay",
    "Nhận việc trong tháng",
    "Tạm thời chưa có nhu cầu",
  ];

  const completionPercentage = Math.round(
    (completedSections.length / allSections.length) * 100
  );

  const handleMenuClick = ({ key }) => {
    const section = sectionRefs[key].current;
    if (section) {
      const topOffset = 60; // khoảng cách cách top
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - topOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const showEditModal = () => {
    form.setFieldsValue(personalInfo);
    setIsEditModalVisible(true);
  };

  const handleEditOk = () => {
    form.validateFields().then((values) => {
      setPersonalInfo(values);
      setIsEditModalVisible(false);
    });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const addSection = (section) => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
  };

  return (
    <Layout className={styles.resumeLayout}>
      <Row gutter={[24, 24]} justify={"center"}>
        <Col span={21}>
          <Row
            gutter={[24, 24]}
            style={{
              background: "#f8f9fa",
              padding: "16px 0",
              borderRadius: "24px",
            }}
          >
            {/* Cột 1: Menu điều hướng */}
            <Col xs={24} md={6} lg={6}>
              <div className={styles.stickyMenu}>
                <Card className={styles.menuCard}>
                  <Menu
                    mode="vertical"
                    defaultSelectedKeys={["personalInfo"]}
                    onClick={handleMenuClick}
                    className={styles.navMenu}
                  >
                    <Menu.Item key="personalInfo" icon={<UserOutlined />}>
                      Thông tin cá nhân
                    </Menu.Item>
                    <Menu.Item key="jobStatus" icon={<SearchOutlined />}>
                      Trạng thái tìm việc
                    </Menu.Item>
                    <Menu.Item key="jobExpectation" icon={<BulbOutlined />}>
                      Mong muốn tìm việc
                    </Menu.Item>
                    <Menu.Item key="education" icon={<StarOutlined />}>
                      Học vấn
                    </Menu.Item>
                    <Menu.Item key="highlights" icon={<StarOutlined />}>
                      Điểm nổi bật
                    </Menu.Item>
                    <Menu.Item key="workExperience" icon={<TeamOutlined />}>
                      Kinh nghiệm làm việc
                    </Menu.Item>
                    <Menu.Item key="projects" icon={<ProjectOutlined />}>
                      Kinh nghiệm dự án
                    </Menu.Item>
                    <Menu.Item key="skills" icon={<CheckCircleOutlined />}>
                      Năng lực chuyên môn
                    </Menu.Item>
                  </Menu>
                </Card>
              </div>
            </Col>

            {/* Cột 2: Nội dung chi tiết */}
            <Col xs={24} md={12} lg={13}>
              <Card className={styles.contentCard}>
                {/* Thông tin cá nhân */}
                <div ref={sectionRefs.personalInfo} className={styles.section}>
                  <Title level={3} className={styles.sectionTitle}>
                    Thông tin cá nhân
                  </Title>
                  <div className={styles.personalInfo}>
                    <Avatar
                      size={80}
                      src={personalInfo.avatar}
                      icon={<UserOutlined />}
                      className={styles.avatar}
                    />
                    <div className={styles.infoDetails}>
                      <Title level={4}>{personalInfo.fullName}</Title>
                      <Text>Trạng thái: {jobStatus}</Text>
                      <Text>Số điện thoại: {personalInfo.phone}</Text>
                      <Text>Tuổi: {personalInfo.age}</Text>
                      <Text>Bậc đào tạo: {personalInfo.education}</Text>
                      <Text>Kinh nghiệm: {personalInfo.experience}</Text>
                      <Text>Email: {personalInfo.email}</Text>
                    </div>
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={showEditModal}
                      className={styles.editButton}
                    >
                      Chỉnh sửa
                    </Button>
                  </div>
                </div>

                {/* Modal chỉnh sửa thông tin cá nhân */}
                <Modal
                  title="Chỉnh sửa thông tin cá nhân"
                  visible={isEditModalVisible}
                  onOk={handleEditOk}
                  onCancel={handleEditCancel}
                  okText="Lưu"
                  cancelText="Hủy"
                >
                  <Form form={form} layout="vertical">
                    <Form.Item
                      name="fullName"
                      label="Họ và tên"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ và tên",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="phone"
                      label="Số điện thoại"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="age"
                      label="Tuổi"
                      rules={[
                        { required: true, message: "Vui lòng nhập tuổi" },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                    <Form.Item
                      name="education"
                      label="Bậc đào tạo"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập bậc đào tạo",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="experience"
                      label="Kinh nghiệm làm việc"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập kinh nghiệm",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: "email", message: "Email không hợp lệ" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Form>
                </Modal>

                {/* Trạng thái tìm việc */}
                <div ref={sectionRefs.jobStatus} className={styles.section}>
                  <Title level={3} className={styles.sectionTitle}>
                    Trạng thái tìm việc
                  </Title>
                  <Select
                    style={{ width: 200 }}
                    value={jobStatus}
                    onChange={setJobStatus}
                  >
                    {jobStatusOptions.map((status) => (
                      <Option key={status} value={status}>
                        {status}
                      </Option>
                    ))}
                  </Select>
                </div>

                {/* Mong muốn tìm việc */}
                <div
                  ref={sectionRefs.jobExpectation}
                  className={styles.section}
                >
                  <Title level={3} className={styles.sectionTitle}>
                    Mong muốn tìm việc
                  </Title>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => addSection("Mong muốn tìm việc")}
                  >
                    Thêm mong muốn
                  </Button>
                </div>

                {/* Học vấn */}
                <div ref={sectionRefs.education} className={styles.section}>
                  <Title level={3} className={styles.sectionTitle}>
                    Học vấn
                  </Title>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => addSection("Học vấn")}
                  >
                    Thêm học vấn
                  </Button>
                </div>

                {/* Điểm nổi bật */}
                <div ref={sectionRefs.highlights} className={styles.section}>
                  <Title level={3} className={styles.sectionTitle}>
                    Điểm nổi bật
                  </Title>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => addSection("Điểm nổi bật")}
                  >
                    Thêm điểm nổi bật
                  </Button>
                </div>

                {/* Kinh nghiệm làm việc */}
                <div
                  ref={sectionRefs.workExperience}
                  className={styles.section}
                >
                  <Title level={3} className={styles.sectionTitle}>
                    Kinh nghiệm làm việc
                  </Title>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => addSection("Kinh nghiệm làm việc")}
                  >
                    Thêm kinh nghiệm
                  </Button>
                </div>

                {/* Kinh nghiệm dự án */}
                <div ref={sectionRefs.projects} className={styles.section}>
                  <Title level={3} className={styles.sectionTitle}>
                    Kinh nghiệm dự án
                  </Title>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => addSection("Kinh nghiệm dự án")}
                  >
                    Thêm dự án
                  </Button>
                </div>

                {/* Năng lực chuyên môn */}
                <div ref={sectionRefs.skills} className={styles.section}>
                  <Title level={3} className={styles.sectionTitle}>
                    Năng lực chuyên môn
                  </Title>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => addSection("Năng lực chuyên môn")}
                  >
                    Thêm năng lực
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Cột 3: Quản lý CV và Hoàn thành thông tin */}
            <Col xs={24} md={6} lg={5}>
              <Card className={styles.sidebarCard}>
                <Title level={4} className={styles.sidebarTitle}>
                  Hoàn thành thông tin
                </Title>
                <div className={styles.progressContainer}>
                  <Progress
                    type="circle"
                    percent={completionPercentage}
                    format={(percent) => `${percent}%`}
                    strokeColor="#577cf6"
                    trailColor="#e6f4ff"
                    width={120}
                  />
                </div>
                <List
                  header={<Text strong>Đã hoàn thành</Text>}
                  dataSource={completedSections}
                  renderItem={(item) => (
                    <List.Item>
                      <CheckCircleOutlined className={styles.completedIcon} />{" "}
                      {item}
                    </List.Item>
                  )}
                  style={{ marginBottom: 16 }}
                />
                <List
                  header={<Text strong>Chưa hoàn thành</Text>}
                  dataSource={allSections.filter(
                    (section) => !completedSections.includes(section)
                  )}
                  renderItem={(item) => (
                    <List.Item>
                      <Text>{item}</Text>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default OnlineResumePage;
