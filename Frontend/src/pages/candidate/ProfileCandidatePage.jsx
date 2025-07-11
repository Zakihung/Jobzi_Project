import React, { useContext, useState } from "react";
import {
  Layout,
  Row,
  Col,
  Menu,
  Card,
  Typography,
  Avatar,
  Button,
  List,
  Space,
  Modal,
  Upload,
  App,
  Popover,
  Input,
} from "antd";
import {
  FileTextOutlined,
  CalendarOutlined,
  HeartOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/ProfileCandidatePage.module.css";
import { AuthContext } from "../../contexts/auth.context";
import dayjs from "dayjs";

import useGetResumeFilesByCandidateId from "../../features/resume_file/hooks/useGetResumeFilesByCandidateId";
import useCreateResumeFile from "../../features/resume_file/hooks/useCreateResumeFile";
import useUpdateResumeFile from "../../features/resume_file/hooks/useUpdateResumeFile";
import useDeleteResumeFile from "../../features/resume_file/hooks/useDeleteResumeFile";
import useGetCandidateByUserId from "../../features/candidate/hooks/useGetCandidateByUserId";

const { Content } = Layout;
const { Title, Text } = Typography;

const ProfileCandidatePage = () => {
  const { message } = App.useApp();
  const { auth } = useContext(AuthContext);
  const userData = auth?.user;
  const { data: candidateData } = useGetCandidateByUserId(userData?.id);
  const candidateId = candidateData?.data?._id;
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("applied");
  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [editFileId, setEditFileId] = useState(null);
  const [editFileName, setEditFileName] = useState("");
  const [previewFileUrl, setPreviewFileUrl] = useState("");
  const [deleteFileId, setDeleteFileId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [candidateStatus, setCandidateStatus] = useState("Sẵn sàng tìm việc");

  // Sử dụng hook để lấy danh sách resume files
  const { data: resumeFiles, isLoading: isLoadingResumeFiles } =
    useGetResumeFilesByCandidateId(candidateId);
  console.log("Resume Files:", resumeFiles);

  // Sử dụng hook để tạo resume file
  const createResumeFile = useCreateResumeFile();

  // Sử dụng hook để cập nhật resume file
  const updateResumeFile = useUpdateResumeFile();

  // Sử dụng hook để xóa resume file
  const deleteResumeFile = useDeleteResumeFile();

  // Sample data for menu content
  const appliedJobs = [
    // {
    //   id: 1,
    //   title: "Senior React Developer",
    //   company: "Công ty ABC",
    //   date: "2025-06-03",
    // },
  ];

  const interviews = [
    // {
    //   id: 1,
    //   title: "Senior React Developer",
    //   company: "Công ty ABC",
    //   date: "2025-06-10",
    //   time: "10:00 AM",
    // },
  ];

  const followedJobs = [
    // {
    //   id: 1,
    //   title: "Backend Developer",
    //   company: "Công ty DEF",
    //   date: "2025-06-02",
    // },
  ];

  // Status options
  const statusOptions = [
    "Chưa có nhu cầu",
    "Sẵn sàng tìm việc",
    "Nhận việc trong tháng này",
  ];

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  const handleViewOnlineResume = () => {
    navigate("/online-resume");
  };

  const showUploadModal = () => {
    if (resumeFiles?.length >= 3) {
      message.warning("Bạn chỉ có thể đăng tải tối đa 3 tệp CV!");
      return;
    }
    setIsUploadModalVisible(true);
    setSelectedFile(null);
    setFileName("");
  };

  const handleUploadModalCancel = () => {
    setIsUploadModalVisible(false);
    setSelectedFile(null);
    setFileName("");
    setIsUploading(false);
  };

  const handleUploadChange = ({ file }) => {
    if (file.status === "done") {
      message.success(`${file.name} đã được đăng tải thành công!`);
      setIsUploadModalVisible(false);
      setSelectedFile(null);
      setFileName("");
      setIsUploading(false);
    } else if (file.status === "error") {
      message.error(`${file.name} đăng tải thất bại.`);
      setIsUploading(false);
    } else {
      setSelectedFile(file);
      setFileName(file.name); // Đặt tên mặc định là tên file
    }
  };

  const handleUploadFile = () => {
    if (!selectedFile) {
      message.error("Vui lòng chọn tệp trước khi đăng tải!");
      return;
    }
    setIsUploading(true);
    createResumeFile.mutate(
      {
        candidateId,
        data: { name: fileName || selectedFile.name },
        file: selectedFile,
      },
      {
        onSuccess: () => {
          message.success(`${selectedFile.name} đã được đăng tải thành công!`);
          setIsUploadModalVisible(false);
          setSelectedFile(null);
          setFileName("");
          setIsUploading(false);
        },
        onError: (error) => {
          message.error(`${selectedFile.name} đăng tải thất bại.`);
          setIsUploading(false);
          setSelectedFile(null); // Reset file nếu thất bại
          setFileName("");
        },
      }
    );
  };

  const showEditModal = (file) => {
    setEditFileId(file._id);
    setEditFileName(file.name);
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setEditFileId(null);
    setEditFileName("");
  };

  const handleEditFile = () => {
    if (!editFileName.trim()) {
      message.error("Tên tệp không được để trống!");
      return;
    }
    updateResumeFile.mutate(
      {
        id: editFileId,
        data: { name: editFileName },
        file: null,
      },
      {
        onSuccess: () => {
          message.success("Cập nhật tên tệp thành công!");
          setIsEditModalVisible(false);
          setEditFileId(null);
          setEditFileName("");
        },
        onError: (error) => {
          message.error("Cập nhật tên tệp thất bại!");
        },
      }
    );
  };

  const showDeleteModal = (fileId) => {
    setDeleteFileId(fileId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteFile = () => {
    if (!deleteFileId) return;
    setIsDeleting(true);
    deleteResumeFile.mutate(deleteFileId, {
      onSuccess: () => {
        message.success("Xóa tệp CV thành công!");
        setIsDeleteModalVisible(false);
        setDeleteFileId(null);
        setIsDeleting(false);
      },
      onError: (error) => {
        message.error("Xóa tệp CV thất bại!");
        setIsDeleting(false);
      },
    });
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setDeleteFileId(null);
  };

  const handlePreviewFile = (file) => {
    setPreviewFileUrl(file.path);
    setIsPreviewModalVisible(true);
  };

  const handlePreviewModalCancel = () => {
    setIsPreviewModalVisible(false);
    setPreviewFileUrl("");
  };

  const statusPopoverContent = (
    <div className={styles.statusOptions}>
      {statusOptions.map((status) => (
        <div
          key={status}
          className={styles.statusOption}
          onClick={() => handleStatusChange(status)}
        >
          {status}
        </div>
      ))}
    </div>
  );

  const handleStatusChange = (status) => {
    setCandidateStatus(status);
    message.success(`Cập nhật trạng thái thành: ${status}`);
    // Gọi API để lưu trạng thái nếu cần
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "applied":
        return (
          <List
            dataSource={appliedJobs}
            renderItem={(item) => (
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={<FileTextOutlined className={styles.listIcon} />}
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>{item.company}</Text>
                      <Text type="secondary">Gửi CV: {item.date}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        );
      case "interviews":
        return (
          <List
            dataSource={interviews}
            renderItem={(item) => (
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={<CalendarOutlined className={styles.listIcon} />}
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>{item.company}</Text>
                      <Text type="secondary">
                        Lịch phỏng vấn: {item.date}, {item.time}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        );
      case "followed":
        return (
          <List
            dataSource={followedJobs}
            renderItem={(item) => (
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={<HeartOutlined className={styles.listIcon} />}
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>{item.company}</Text>
                      <Text type="secondary">Quan tâm: {item.date}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout className={styles.profileLayout}>
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
            {/* Left Section: Menu and Content */}
            <Col xs={24} lg={15}>
              <Card className={styles.menuCard}>
                <Menu
                  mode="horizontal"
                  selectedKeys={[selectedMenu]}
                  onClick={handleMenuClick}
                  className={styles.profileMenu}
                >
                  <Menu.Item key="applied" icon={<FileTextOutlined />}>
                    Đã gửi CV
                  </Menu.Item>
                  <Menu.Item key="interviews" icon={<CalendarOutlined />}>
                    Phỏng vấn
                  </Menu.Item>
                  <Menu.Item key="followed" icon={<HeartOutlined />}>
                    Quan tâm
                  </Menu.Item>
                </Menu>
                <div className={styles.menuContent}>{renderContent()}</div>
              </Card>
            </Col>

            {/* Right Section: Profile and CV Management */}
            <Col span={9}>
              <Card className={styles.profileCard}>
                <div className={styles.profileHeader}>
                  <Avatar
                    src={
                      userData.avatar ||
                      "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750090817/avaMacDinh_toiqej.jpg"
                    }
                    size={100}
                  />
                  <Title level={4} className={styles.profileName}>
                    {userData.full_name}
                  </Title>
                  <Popover
                    content={statusPopoverContent}
                    trigger="click"
                    placement="bottom"
                  >
                    <div className={styles.profileStatusWrapper}>
                      <Text className={styles.profileStatus}>
                        {candidateStatus}
                      </Text>
                      <EditOutlined className={styles.editStatusIcon} />
                    </div>
                  </Popover>
                  <Button
                    type="primary"
                    size="large"
                    className={styles.onlineResumeButton}
                    onClick={handleViewOnlineResume}
                  >
                    CV-online
                  </Button>
                </div>
                {/* <Space direction="vertical" className={styles.profileInfo}>
                  <div className={styles.infoItem}>
                    <UserOutlined className={styles.infoIcon} />
                    <Text>Tuổi: {age ?? "Chưa cập nhật"}</Text>
                  </div>
                  <div className={styles.infoItem}>
                    <ClockCircleOutlined className={styles.infoIcon} />
                    <Text>Kinh nghiệm: {candidate.experience}</Text>
                  </div>
                  <div className={styles.infoItem}>
                    <BookOutlined className={styles.infoIcon} />
                    <Text>Học vấn: {candidate.education}</Text>
                  </div>
                </Space> */}
              </Card>

              <Card className={styles.cvManagementCard}>
                <Title level={5} className={styles.cvManagementTitle}>
                  Quản lý tệp CV ({resumeFiles?.length || 0}/3)
                </Title>
                {isLoadingResumeFiles ? (
                  <Text>Đang tải danh sách CV...</Text>
                ) : (
                  <List
                    dataSource={resumeFiles || []}
                    renderItem={(file) => (
                      <List.Item
                        className={styles.cvItem}
                        actions={[
                          <Button
                            type="link"
                            onClick={() => handlePreviewFile(file)}
                          >
                            Xem trước
                          </Button>,
                          <Button
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => showEditModal(file)}
                          ></Button>,
                          <Button
                            type="link"
                            icon={<DeleteOutlined />}
                            onClick={() => showDeleteModal(file._id)}
                            danger
                          ></Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={
                            <FileTextOutlined className={styles.cvIcon} />
                          }
                          title={<Text>{file.name}</Text>}
                          description={
                            <Space direction="vertical" size={4}>
                              {/* <Text type="secondary">
                                Kích thước:{" "}
                                {(file.size / 1024 / 1024).toFixed(1)} MB
                              </Text> */}
                              <Text type="secondary">
                                Ngày tải lên:{" "}
                                {dayjs(file.createdAt).format("YYYY-MM-DD")}
                              </Text>
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                )}
                <Button
                  type="primary"
                  icon={<UploadOutlined />}
                  className={styles.uploadCvButton}
                  onClick={showUploadModal}
                  block
                  disabled={resumeFiles?.length >= 3}
                >
                  Đăng tải tệp CV
                </Button>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Upload CV Modal */}
      <Modal
        title="Đăng tải CV"
        visible={isUploadModalVisible}
        footer={null}
        onCancel={handleUploadModalCancel}
      >
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Upload.Dragger
            name="cvFile"
            accept=".pdf"
            maxCount={1}
            onChange={handleUploadChange}
            beforeUpload={() => false} // Ngăn tự động upload
            disabled={isUploading}
            fileList={selectedFile ? [selectedFile] : []} // Chỉ hiển thị file hiện tại
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Kéo và thả tệp CV tại đây</p>
            <p className="ant-upload-hint">Hỗ trợ định dạng .pdf</p>
          </Upload.Dragger>
          {selectedFile && (
            <>
              <Text>Tên tệp:</Text>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Nhập tên tệp (mặc định: tên file gốc)"
              />
              <Space style={{ justifyContent: "flex-end", width: "100%" }}>
                <Button
                  onClick={handleUploadModalCancel}
                  disabled={isUploading}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  onClick={handleUploadFile}
                  loading={isUploading}
                  disabled={isUploading}
                >
                  Đăng tải
                </Button>
              </Space>
            </>
          )}
        </Space>
      </Modal>

      {/* Edit CV Name Modal */}
      <Modal
        title="Chỉnh sửa tên tệp CV"
        open={isEditModalVisible}
        onOk={handleEditFile}
        onCancel={handleEditModalCancel}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Input
          value={editFileName}
          onChange={(e) => setEditFileName(e.target.value)}
          placeholder="Nhập tên tệp mới"
        />
      </Modal>

      {/* Preview CV Modal */}
      <Modal
        title="Xem trước CV"
        open={isPreviewModalVisible}
        onCancel={handlePreviewModalCancel}
        footer={null}
        width={800}
      >
        <iframe
          src={previewFileUrl}
          style={{ width: "100%", height: "500px" }}
          title="CV Preview"
        />
      </Modal>

      {/* Delete CV Modal */}
      <Modal
        title="Xóa tệp CV"
        open={isDeleteModalVisible}
        onOk={handleDeleteFile}
        onCancel={handleDeleteModalCancel}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true, loading: isDeleting }}
      >
        <Text>
          Bạn có chắc muốn xóa tệp CV này không? Hành động này không thể hoàn
          tác.
        </Text>
      </Modal>
    </Layout>
  );
};

export default ProfileCandidatePage;
