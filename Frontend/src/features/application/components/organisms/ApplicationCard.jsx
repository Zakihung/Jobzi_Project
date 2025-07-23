import React, { useContext, useState } from "react";
import { Card, Avatar, Typography, Button, Modal, Tag, Skeleton } from "antd";
import { FileTextOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { formatTime } from "../../../../constants/formatTime";
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
  cursor: pointer;
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
  margin-bottom: 0.5rem;
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
  flex-wrap: wrap;
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
`;

const DetailIcon = styled.span`
  color: #577cf6;
  font-size: 14px;
`;

const DetailText = styled(Text)`
  font-size: 14px;
`;

const StatusTag = styled(Tag)`
  background: #f6f8ff;
  color: #577cf6;
  border: 1px solid #d6e4ff;
  border-radius: 16px;
  font-size: 12px;
  padding: 4px 12px;
  font-weight: 500;
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

const WarningText = styled(Text)`
  color: #ff4d4f;
  font-size: 12px;
  font-weight: 500;
`;

const ApplicationCard = ({ application }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { message } = App.useApp();
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

  return (
    <ApplicationCardWrapper
      onClick={() => navigate(`/jobpost/${application.job_post_id?._id}`)}
    >
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
        <ActionBtn onClick={handleCancelApplication} loading={isDeleting}>
          Hủy ứng tuyển
        </ActionBtn>
      </ApplicationHeader>
      <ApplicationDetails>
        <DetailItem>
          <DetailIcon as={FileTextOutlined} />
          <DetailText>
            Gửi CV:{" "}
            {new Date(application.createdAt).toLocaleDateString("vi-VN")}
          </DetailText>
        </DetailItem>
        <DetailItem>
          <StatusTag>{application.status || "Đang xử lý"}</StatusTag>
        </DetailItem>
        {isWithin24Hours() && (
          <DetailItem>
            <WarningText>
              Bạn chỉ có thể hủy ứng tuyển trong vòng 24 giờ kể từ khi gửi CV.
              Vui lòng liên hệ nhà tuyển dụng nếu cần hỗ trợ.
            </WarningText>
          </DetailItem>
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
