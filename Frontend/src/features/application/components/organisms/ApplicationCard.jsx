import React, { useState } from "react";
import { Card, Avatar, Typography, Button, Modal, Tag, Skeleton } from "antd";
import {
  InfoCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  CalendarOutlined,
  ProfileOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import useGetCompanyById from "../../../company/hooks/Company/useGetCompanyById";
import useDeleteApplication from "../../../application/hooks/useDeleteApplication";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/auth.context";
import { App } from "antd";

const { Title, Text } = Typography;

const ApplicationCardWrapper = styled(Card)`
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  padding: 16px;
  height: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  &:hover {
    .application-title {
      color: #577cf6 !important;
    }
    border: 1px solid #577cf6;
    box-shadow: 0 0 0 3px rgba(87, 124, 246, 0.2);
  }
`;

const ApplicationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  width: 100%;
`;

const CompanyLogo = styled(Avatar)`
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  justify: flex-start;
`;

const ApplicationContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const ApplicationTitle = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 18px !important;
    font-weight: 600 !important;
    margin: 0 !important;
    line-height: 1.2;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CompanyName = styled(Text)`
  margin-top: 4px;
  font-size: 15px;
  font-weight: 500;
  color: #666;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ApplicationDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  font-size: 14px;
  color: #1a1a1a;
  margin-bottom: 4px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-left: 20px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #666;
`;

const DateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
`;

const StatusSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`;

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatusDescription = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-left: 4px;
`;

// Styled component cho StatusTag với props động
const StatusTag = styled(Tag)`
  border-radius: 16px;
  font-size: 12px;
  padding: 4px 12px;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${(props) => props.statusColor?.background || "#f6f8ff"};
  color: ${(props) => props.statusColor?.color || "#577cf6"};
  border: 1px solid ${(props) => props.statusColor?.border || "#d6e4ff"};
`;

const ActionBtn = styled(Button)`
  color: #1a1a1a !important;
  border: 1px solid #e8e8e8 !important;
  background: #ffffff;
  font-weight: 600;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  &:hover {
    border-color: #ff4d4f !important;
    color: #ff4d4f !important;
    background: #fff1f0 !important;
  }

  .anticon {
    transition: transform 0.3s ease;
  }

  &:hover {
    .anticon {
      transform: scale(1.3);
    }
  }
`;

const ViewDetailBtn = styled(ActionBtn)`
  border-color: #1677ff !important;
  color: #1677ff !important;

  &:hover {
    background: #e6f4ff !important;
    color: #0958d9 !important;
    border-color: #0958d9 !important;
  }
`;

const WarningText = styled.div`
  background: #fff7e6;
  border: 1px solid #ffd591;
  border-radius: 8px;
  padding: 8px 12px;
  color: #d46b08;
  font-size: 12px;
  font-weight: 500;
  margin-top: 4px;
`;

const Divider = styled.div`
  height: 1px;
  background: #f0f0f0;
  margin: 0 -4px;
`;

const StatusText = styled(Text)`
  color: #666;
  font-weight: 500;
`;

const getStatusConfig = (status) => {
  const configs = {
    pending: {
      color: "#d48806", // sẫm hơn #faad14
      background: "#fff7e6", // đậm hơn #fffbe6
      border: "#ffc069", // đậm hơn #ffe58f
      icon: <ClockCircleOutlined />,
      text: "Đang chờ duyệt",
    },
    reviewed: {
      color: "#096dd9", // sẫm hơn #1890ff
      background: "#e6f4ff", // dịu hơn #e6f7ff
      border: "#69c0ff", // đậm hơn #91d5ff
      icon: <EyeOutlined />,
      text: "Đã xem",
    },
    accepted: {
      color: "#389e0d", // sẫm hơn #52c41a
      background: "#f0fff0", // dịu hơn #f6ffed
      border: "#95de64", // đậm hơn #b7eb8f
      icon: <CheckCircleOutlined />,
      text: "Đã chấp nhận",
    },
    rejected: {
      color: "#cf1322", // sẫm hơn #ff4d4f
      background: "#fff2f0", // đậm hơn #fff1f0
      border: "#ff7875", // đậm hơn #ffccc7
      icon: <CloseCircleOutlined />,
      text: "Bị từ chối",
    },
    withdrawn: {
      color: "#595959", // sẫm hơn #8c8c8c
      background: "#f0f0f0", // đậm hơn #f5f5f5
      border: "#bfbfbf", // đậm hơn #d9d9d9
      icon: <MinusCircleOutlined />,
      text: "Đã rút đơn",
    },
  };

  return (
    configs[status] || {
      color: "#434343",
      background: "#f0f5ff",
      border: "#adc6ff",
      icon: <InfoCircleOutlined />,
      text: "Không xác định",
    }
  );
};

const getStatusDescription = (status) => {
  switch (status) {
    case "pending":
      return "Đơn ứng tuyển của bạn đang chờ nhà tuyển dụng xem xét.";
    case "reviewed":
      return "Nhà tuyển dụng đã xem đơn ứng tuyển của bạn.";
    case "accepted":
      return "Bạn đã được chọn để tiếp tục vào vòng sau. Nhà tuyển dụng sẽ liên hệ với bạn sớm nhất có thể.";
    case "rejected":
      return "Rất tiếc! Đơn ứng tuyển của bạn chưa được chọn.";
    case "withdrawn":
      return "Bạn đã rút lại đơn ứng tuyển này.";
    default:
      return "Trạng thái không xác định.";
  }
};

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  const { data: companyData, isLoading } = useGetCompanyById(
    application.job_post_id?.employer_id?.company_id
  );
  const { mutate: deleteApplication, isLoading: isDeleting } =
    useDeleteApplication();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [cannotCancelModalVisible, setCannotCancelModalVisible] =
    useState(false);

  // Kiểm tra xem đơn ứng tuyển có trong 24 giờ hay không
  const isWithin24Hours = () => {
    const applicationTime = new Date(application.createdAt).getTime();
    const currentTime = new Date().getTime();
    const hoursDifference = (currentTime - applicationTime) / (1000 * 60 * 60);
    return hoursDifference <= 24;
  };

  // Kiểm tra xem tin tuyển dụng đã hết hạn hay không
  const isJobExpired = () => {
    if (
      !application.job_post_id?.expired_date ||
      !application.job_post_id?.status
    )
      return false;
    const today = new Date();
    const expiredDate = new Date(application.job_post_id.expired_date);
    return expiredDate < today || application.job_post_id.status === "inactive";
  };

  const handleCancelApplication = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click lan truyền
    if (!isWithin24Hours()) {
      setCannotCancelModalVisible(true);
      return;
    }
    setConfirmModalVisible(true);
  };

  const handleConfirmCancel = (e) => {
    e.stopPropagation();
    deleteApplication(application._id, {
      onSuccess: () => {
        setConfirmModalVisible(false);
      },
      onError: () => {
        setConfirmModalVisible(false);
        // Lỗi đã được xử lý trong useDeleteApplication
      },
    });
  };

  const handleModalCancel = (e) => {
    e.stopPropagation();
    setConfirmModalVisible(false);
    setCannotCancelModalVisible(false);
  };

  const handleNavigate = () => {
    if (isJobExpired()) {
      navigate("/expired-job");
    } else {
      navigate(`/jobpost/${application.job_post_id?._id}`);
    }
  };

  if (isLoading) {
    return (
      <ApplicationCardWrapper>
        <div style={{ padding: "16px" }}>
          <Skeleton
            active
            avatar={{ size: 70, shape: "square" }}
            paragraph={{ rows: 3 }}
          />
        </div>
      </ApplicationCardWrapper>
    );
  }

  const hasRecipientInfo =
    application.job_post_id?.recipient_name ||
    application.job_post_id?.recipient_email ||
    application.job_post_id?.recipient_phone_number;

  const statusConfig = getStatusConfig(application.status);

  return (
    <ApplicationCardWrapper>
      <ApplicationHeader>
        <CompanyLogo
          src={
            companyData?.logo ||
            "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png"
          }
          size={70}
        />
        <ApplicationContent>
          <ApplicationTitle className="application-title">
            {application.job_post_id?.title || "Không xác định"}
          </ApplicationTitle>
          <CompanyName>
            {companyData?.name ||
              application.job_post_id?.employer_id?.company_name ||
              "Không xác định"}
          </CompanyName>
        </ApplicationContent>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "flex-end",
          }}
        >
          <ViewDetailBtn onClick={handleNavigate}>
            Xem chi tiết tin
          </ViewDetailBtn>
          {isWithin24Hours() && (
            <ActionBtn onClick={handleCancelApplication} loading={isDeleting}>
              Hủy ứng tuyển
            </ActionBtn>
          )}
        </div>
      </ApplicationHeader>

      <ApplicationDetails>
        {/* Thông tin người nhận CV */}
        {hasRecipientInfo && (
          <>
            <InfoSection>
              <SectionTitle>
                <ProfileOutlined style={{ color: "#577cf6" }} />
                Thông tin người nhận CV
              </SectionTitle>
              <ContactInfo>
                {application.job_post_id?.recipient_name && (
                  <ContactItem>
                    <UserOutlined />
                    {application.job_post_id.recipient_name}
                  </ContactItem>
                )}
                {application.job_post_id?.recipient_email && (
                  <ContactItem>
                    <MailOutlined />
                    {application.job_post_id.recipient_email}
                  </ContactItem>
                )}
                {application.job_post_id?.recipient_phone_number && (
                  <ContactItem>
                    <PhoneOutlined />
                    {application.job_post_id.recipient_phone_number}
                  </ContactItem>
                )}
              </ContactInfo>
            </InfoSection>
            <Divider />
          </>
        )}

        {/* Ngày gửi CV */}
        <DateInfo>
          <CalendarOutlined style={{ color: "#577cf6" }} />
          <Text strong>Ngày gửi CV:</Text>
          <Text>
            {new Date(application.createdAt).toLocaleDateString("vi-VN")}
          </Text>
        </DateInfo>

        <Divider />

        {/* Trạng thái */}
        <StatusSection>
          <StatusRow>
            <StatusTag statusColor={statusConfig}>
              {statusConfig.icon}
              {statusConfig.text}
            </StatusTag>
          </StatusRow>
          <StatusDescription statusColor={statusConfig}>
            <InfoCircleOutlined
              style={{
                color: statusConfig.color,
                fontSize: "14px",
                marginTop: "1px",
                flexShrink: 0,
              }}
            />
            <StatusText
              statusColor={statusConfig}
              style={{ fontSize: "13px", lineHeight: "1.4" }}
            >
              {getStatusDescription(application.status)}
            </StatusText>
          </StatusDescription>
        </StatusSection>

        {/* Cảnh báo 24h */}
        {isWithin24Hours() && (
          <WarningText>
            Bạn chỉ có thể hủy ứng tuyển trong vòng 24 giờ kể từ khi gửi CV. Vui
            lòng liên hệ người nhận CV nếu cần hỗ trợ.
          </WarningText>
        )}
      </ApplicationDetails>

      <Modal
        title="Xác nhận hủy ứng tuyển"
        open={confirmModalVisible}
        onOk={handleConfirmCancel}
        onCancel={handleModalCancel}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
        wrapProps={{ onClick: (e) => e.stopPropagation() }}
      >
        <p>Bạn có chắc chắn muốn hủy ứng tuyển công việc này?</p>
      </Modal>
      <Modal
        title="Không thể hủy ứng tuyển"
        open={cannotCancelModalVisible}
        onOk={handleModalCancel}
        onCancel={handleModalCancel}
        okText="Đóng"
        cancelButtonProps={{ style: { display: "none" } }}
        wrapProps={{ onClick: (e) => e.stopPropagation() }}
      >
        <p>
          Bạn chỉ có thể hủy ứng tuyển trong vòng 24 giờ kể từ khi gửi CV. Vui
          lòng liên hệ nhà tuyển dụng nếu cần hỗ trợ.
        </p>
      </Modal>
    </ApplicationCardWrapper>
  );
};

export default ApplicationCard;
