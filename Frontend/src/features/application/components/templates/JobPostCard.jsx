import {
  Card,
  Table,
  Button,
  Switch,
  Typography,
  Tag,
  Avatar,
  App,
  Modal,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  ClockCircleOutlined,
  FilePdfOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import useGetApplicationsByJobPostId from "../../hooks/useGetApplicationsByJobPostId";
import useGetNumberOfApplicationByJobPostId from "../../hooks/useGetNumberOfApplicationByJobPostId";
import useUpdateApplicationStatus from "../../hooks/useUpdateApplicationStatus";
import useGetOnlineResume from "../../../cv_online/hooks/useGetOnlineResume";
import PreviewResumeModal from "../../../cv_online/components/organisms/PreviewResumeModal";
import PreviewCVModal from "../../../candidate/components/organisms/PreviewCVModal";
import { useState } from "react";

const { Title, Text } = Typography;

// Styled Components
const JobCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 24px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    padding: 16px;
    margin: 0 8px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const JobTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 28px !important;
  font-weight: 600 !important;
  margin: 0 !important;

  @media (max-width: 768px) {
    font-size: 24px !important;
  }

  @media (max-width: 576px) {
    font-size: 20px !important;
  }
`;

const CandidateCount = styled(Text)`
  font-size: 16px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const StatusDescription = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-left: 4px;
`;

const CandidateTable = styled(Table)`
  background: #ffffff;

  .ant-table-thead > tr > th {
    background: #f8f9fa;
    border-bottom: 2px solid #f0f0f0;
    font-weight: 600;
    font-size: 16px;
    color: #1a1a1a;
    padding: 16px 20px;

    @media (max-width: 768px) {
      font-size: 14px;
      padding: 12px 16px;
    }

    @media (max-width: 576px) {
      font-size: 12px;
      padding: 8px 12px;
    }
  }

  .ant-table-tbody > tr > td {
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: top;

    @media (max-width: 768px) {
      padding: 16px;
    }

    @media (max-width: 576px) {
      padding: 12px;
    }
  }

  .ant-table-tbody > tr:hover > td {
    background: #f0f7ff;
  }

  .ant-table-body {
    scrollbar-width: thin;
    scrollbar-color: #f0f0f0 transparent;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: #f0f0f0;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #666;
    }
  }
`;

const CandidateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CandidateName = styled(Title)`
  color: #1a1a1a !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  margin: 0 !important;

  @media (max-width: 768px) {
    font-size: 16px !important;
  }

  @media (max-width: 576px) {
    font-size: 14px !important;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ContactIcon = styled(MailOutlined)`
  color: #577cf6;
  font-size: 14px;
`;

const ApplicationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ApplicationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const DateIcon = styled(ClockCircleOutlined)`
  color: #666;
  font-size: 12px;
`;

const StatusControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const ActionButton = styled(Button)`
  border-radius: 12px;
  font-weight: 500;
  padding: 4px 12px;

  @media (max-width: 576px) {
    font-size: 11px;
    padding: 4px 8px;
  }
`;

const AcceptButton = styled(ActionButton)`
  background: #52c41a;
  border-color: #52c41a;
  color: #ffffff;

  &:hover {
    background: #389e0d !important;
    border-color: #389e0d !important;
    color: #ffffff !important;
  }
`;

const RejectButton = styled(ActionButton)`
  background: #ff4d4f;
  border-color: #ff4d4f;
  color: #ffffff;

  &:hover {
    background: #cf1322 !important;
    border-color: #cf1322 !important;
    color: #ffffff !important;
  }
`;

const StatusTag = styled(Tag)`
  font-weight: 600;
  font-size: 14px;
  border-radius: 12px;
  padding: 4px 12px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 2px 8px;
  }
`;

const ViewProfileButton = styled(Button)`
  background: #577cf6;
  border-color: #577cf6;
  border-radius: 12px;
  font-weight: 500;
  padding: 16px 12px;

  @media (max-width: 1200px) {
    width: auto;
    min-width: 120px;
  }

  @media (max-width: 576px) {
    font-size: 11px;
    padding: 4px 8px;
  }
`;

const JobPostCard = ({ job }) => {
  const { message } = App.useApp();
  const { data: applications, isLoading: isApplicationsLoading } =
    useGetApplicationsByJobPostId(job.id);
  const { data: applicationCount, isLoading: isCountLoading } =
    useGetNumberOfApplicationByJobPostId(job.id);
  const { mutate: updateApplicationStatus, isLoading: isUpdatingStatus } =
    useUpdateApplicationStatus();
  const [isPreviewModalVisible, setIsPreviewModalVisible] = useState(false);
  const [previewFileUrl, setPreviewFileUrl] = useState("");
  const [isResumeModalVisible, setIsResumeModalVisible] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const {
    data: resumeData,
    isLoading: isLoadingResumeData,
    isError: isErrorResumeData,
  } = useGetOnlineResume(selectedCandidateId);
  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    applicationId: null,
    action: null,
  });

  const isPreviewable = (url) => {
    if (!url) return false;
    const extension = url.split(".").pop()?.toLowerCase();
    const supportedFormats = ["pdf", "jpg", "jpeg", "png"];
    const isRawFile = url.includes("/raw/upload/");
    return supportedFormats.includes(extension) || isRawFile;
  };

  const handleViewProfile = (
    applicationId,
    profileUrl,
    status,
    candidateId,
    profileType
  ) => {
    if (status === "pending") {
      updateApplicationStatus(
        { id: applicationId, status: "reviewed" },
        {
          onError: (error) => {
            message.error(`Cập nhật trạng thái thất bại: ${error.message}`);
          },
        }
      );
    }

    if (profileType === "online") {
      setSelectedCandidateId(candidateId);
      setIsResumeModalVisible(true);
    } else if (isPreviewable(profileUrl)) {
      setPreviewFileUrl(profileUrl);
      setIsPreviewModalVisible(true);
    } else {
      window.open(profileUrl, "_blank");
    }
  };

  const handlePreviewModalCancel = () => {
    setIsPreviewModalVisible(false);
    setPreviewFileUrl("");
  };

  const handleResumeModalCancel = () => {
    setIsResumeModalVisible(false);
    setSelectedCandidateId(null);
  };

  const handleStatusAction = (applicationId, action) => {
    setConfirmModal({
      visible: true,
      applicationId,
      action,
    });
  };

  const handleConfirmStatus = () => {
    const { applicationId, action } = confirmModal;
    updateApplicationStatus(
      { id: applicationId, status: action },
      {
        onSuccess: () => {
          message.success(
            action === "accepted"
              ? "Đã chấp nhận ứng viên"
              : "Đã từ chối ứng viên"
          );
          setConfirmModal({
            visible: false,
            applicationId: null,
            action: null,
          });
        },
        onError: (error) => {
          message.error(`Cập nhật trạng thái thất bại: ${error.message}`);
          setConfirmModal({
            visible: false,
            applicationId: null,
            action: null,
          });
        },
      }
    );
  };

  const handleModalCancel = () => {
    setConfirmModal({ visible: false, applicationId: null, action: null });
  };

  const getApplicationStatus = (status) => {
    switch (status) {
      case "accepted":
        return { text: "Đã chấp nhận", color: "green" };
      case "rejected":
        return { text: "Đã từ chối", color: "red" };
      case "withdrawn":
        return { text: "Ứng viên đã rút đơn", color: "grey" };
      default:
        return { text: "Đang chờ duyệt", color: "orange" };
    }
  };

  const columns = [
    {
      title: "Ứng viên",
      dataIndex: "candidate",
      key: "candidate",
      width: "30%",
      render: (_, record) => (
        <CandidateInfo>
          <Avatar
            src={record.avatar}
            icon={!record.avatar && <UserOutlined />}
            size={40}
          />
          <div>
            <CandidateName level={5}>{record.name}</CandidateName>
            <ContactInfo>
              <ContactIcon />
              <Text type="secondary">{record.email}</Text>
            </ContactInfo>
          </div>
        </CandidateInfo>
      ),
    },
    {
      title: "Thông tin ứng tuyển",
      dataIndex: "application",
      key: "application",
      width: "30%",
      render: (_, record) => (
        <ApplicationInfo>
          <ApplicationItem>
            <DateIcon />
            <Text type="secondary">
              Ngày ứng tuyển:{" "}
              {new Date(record.applicationDate).toLocaleDateString("vi-VN")}
            </Text>
          </ApplicationItem>
          <ApplicationItem>
            <ProfileOutlined />
            <Text type="secondary">Hồ sơ: {record.profileName}</Text>
          </ApplicationItem>
        </ApplicationInfo>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "20%",
      render: (_, record) => {
        const statusInfo = getApplicationStatus(record.status);
        const isWithdrawn = record.status === "withdrawn";
        const isAccepted = record.status === "accepted";
        const isRejected = record.status === "rejected";
        const canUpdateStatus =
          record.status === "pending" || record.status === "reviewed";

        return (
          <StatusControl>
            {isWithdrawn || isAccepted || isRejected ? (
              isAccepted ? (
                <StatusControl>
                  <StatusTag color={statusInfo.color}>
                    {statusInfo.text}
                  </StatusTag>
                  <StatusDescription>
                    <InfoCircleOutlined
                      style={{
                        color: "#389e0d",
                        fontSize: "14px",
                        marginTop: "10px",
                        flexShrink: 0,
                      }}
                    />
                    <Text>Vui lòng liên hệ với ứng viên để hẹn phỏng vấn</Text>
                  </StatusDescription>
                </StatusControl>
              ) : (
                <StatusTag color={statusInfo.color}>
                  {statusInfo.text}
                </StatusTag>
              )
            ) : (
              <>
                <div style={{ display: "flex", gap: "8px" }}>
                  <AcceptButton
                    icon={<CheckCircleOutlined />}
                    disabled={!canUpdateStatus || isRejected}
                    onClick={() => handleStatusAction(record.id, "accepted")}
                    loading={
                      isUpdatingStatus &&
                      confirmModal.applicationId === record.id
                    }
                  >
                    Chấp nhận
                  </AcceptButton>
                  <RejectButton
                    icon={<CloseCircleOutlined />}
                    disabled={!canUpdateStatus || isAccepted}
                    onClick={() => handleStatusAction(record.id, "rejected")}
                    loading={
                      isUpdatingStatus &&
                      confirmModal.applicationId === record.id
                    }
                  >
                    Từ chối
                  </RejectButton>
                </div>
              </>
            )}
          </StatusControl>
        );
      },
    },
    {
      title: "Hồ sơ",
      dataIndex: "profile",
      key: "profile",
      width: "20%",
      render: (_, record) => (
        <ViewProfileButton
          type="primary"
          icon={
            isPreviewable(record.profileUrl) ? (
              <FilePdfOutlined />
            ) : (
              <ProfileOutlined />
            )
          }
          size="small"
          onClick={() =>
            handleViewProfile(
              record.id,
              record.profileUrl,
              record.status,
              record.candidateId,
              record.profileType
            )
          }
          disabled={
            record.status === "withdrawn" || record.status === "rejected"
          }
        >
          Xem hồ sơ
        </ViewProfileButton>
      ),
    },
  ];

  const formattedApplications =
    applications?.map((app) => ({
      id: app?._id,
      name: app?.candidate_id?.user_id?.full_name || "Không xác định",
      avatar: app?.candidate_id?.user_id?.avatar || null,
      email: app?.candidate_id?.user_id?.email || "Không có email",
      applicationDate: app?.createdAt || new Date(),
      profileName: app?.resume_file_id?.name
        ? app?.resume_file_id?.name
        : app?.online_resume_id
        ? "Hồ sơ trực tuyến"
        : "Hồ sơ không xác định",
      status: app?.status || "pending",
      profileUrl: app?.resume_file_id?.path || "#",
      profileType: app?.resume_file_id ? "pdf" : "online",
      candidateId: app?.candidate_id?._id,
    })) || [];

  if (isApplicationsLoading || isCountLoading) {
    return <JobCard>Đang tải dữ liệu ứng tuyển...</JobCard>;
  }

  return (
    <JobCard>
      <CardHeader>
        <JobTitle level={2}>{job.title}</JobTitle>
        <CandidateCount>
          Tổng cộng: {applicationCount?.count || 0} ứng viên
        </CandidateCount>
      </CardHeader>
      {formattedApplications.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div>
            <UserOutlined
              style={{ fontSize: 40, color: "#ccc", marginBottom: 12 }}
            />
          </div>
          <div>
            <Text type="secondary" style={{ fontSize: 16 }}>
              Chưa có ứng viên nào ứng tuyển cho công việc này.
            </Text>
          </div>
        </div>
      ) : (
        <CandidateTable
          columns={columns}
          dataSource={formattedApplications}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      )}
      <PreviewCVModal
        visible={isPreviewModalVisible}
        onCancel={handlePreviewModalCancel}
        previewUrl={previewFileUrl}
      />
      <PreviewResumeModal
        isModalVisible={isResumeModalVisible}
        handleCancel={handleResumeModalCancel}
        resumeData={resumeData}
        isLoadingResumeData={isLoadingResumeData}
        isErrorResumeData={isErrorResumeData}
      />
      <Modal
        title={
          confirmModal.action === "accepted"
            ? "Xác nhận chấp nhận"
            : "Xác nhận từ chối"
        }
        open={confirmModal.visible}
        onOk={handleConfirmStatus}
        onCancel={handleModalCancel}
        okText={confirmModal.action === "accepted" ? "Chấp nhận" : "Từ chối"}
        cancelText="Hủy"
        okButtonProps={{ danger: confirmModal.action === "rejected" }}
      >
        <p>
          Bạn có chắc chắn muốn{" "}
          {confirmModal.action === "accepted" ? "chấp nhận" : "từ chối"} ứng
          viên này?
        </p>
      </Modal>
    </JobCard>
  );
};

export default JobPostCard;
