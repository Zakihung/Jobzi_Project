import React, { useContext } from "react";
import { Card, Menu, Typography, Space, Spin, Button } from "antd";
import {
  FileTextOutlined,
  HeartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { AuthContext } from "../../../../contexts/auth.context";
import useGetJobPostSaveByCandidate from "../../../candidate/hooks/Candidate_Save_Job_Post/useGetJobPostSaveByCandidate";
import useGetListCompany from "../../../company/hooks/Company/useGetListCompany";
import useGetApplicationsByCandidateId from "../../../application/hooks/useGetApplicationsByCandidateId";
import JobGrid from "../../../job/components/templates/JobGrid";
import ApplicationGrid from "../../../application/components/templates/ApplicationGrid";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: white;
  padding: 0;
`;

const StyledMenu = styled(Menu)`
  border-bottom: 2px solid #f0f0f0;

  .ant-menu-item {
    font-size: 16px;
    font-weight: 600;
    padding: 0 24px;
    height: 48px;
    line-height: 48px;
  }

  .ant-menu-item-selected {
    color: #577cf6 !important;
  }

  .ant-menu-item-selected::after {
    border-bottom-color: #577cf6 !important;
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;

    .ant-menu-item {
      padding: 0 16px;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
    }
  }
`;

const MenuContent = styled.div`
  padding: 24px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
`;

const EmptyText = styled(Text)`
  display: block;
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
`;

const ExploreButton = styled(Button)`
  background: #577cf6 !important;
  border-color: #577cf6 !important;
  border-radius: 8px;
  font-weight: 600;
  height: 40px;
  padding: 0 24px;
  color: #ffffff !important;

  &:hover {
    background: #4c6ef5 !important;
    border-color: #4c6ef5 !important;
    box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
  }
`;

const JobMenuCard = ({ selectedMenu, onMenuClick }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const candidateId = auth?.user?.candidate_id;

  const {
    data: applications,
    isLoading: isLoadingApplications,
    isError: isErrorApplications,
  } = useGetApplicationsByCandidateId(candidateId);

  const { data: savedJobPosts, isLoading: isLoadingSavedJobPosts } =
    useGetJobPostSaveByCandidate(candidateId);

  const { data: companies, isLoading: isLoadingCompanies } =
    useGetListCompany();

  // Chuẩn hóa dữ liệu savedJobPosts
  const sortedJobPosts = React.useMemo(() => {
    if (!savedJobPosts || !companies) return [];

    return savedJobPosts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((item) => {
        const job = item.job_post_id;
        const company = companies.find(
          (c) => c._id === job?.employer_id?.company_id
        );
        const locations =
          job?.locations
            ?.map((loc) => loc.province)
            .filter(Boolean)
            .join(", ") || "Không xác định";
        return {
          id: job?._id,
          title: job?.title,
          company: company ? company.name : "Công ty không xác định",
          logo:
            company?.logo ||
            "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png",
          location: locations,
          salary:
            job?.salary_type === "negotiable"
              ? "Thỏa thuận"
              : `${(job?.min_salary_range / 1000000).toFixed(0)}-${(
                  job?.max_salary_range / 1000000
                ).toFixed(0)} triệu`,
          tags: job?.skills || [],
          saved: true, // Công việc đã lưu nên mặc định true
          posted: job?.createdAt,
        };
      });
  }, [savedJobPosts, companies]);

  const sortedApplications = Array.isArray(applications)
    ? [...applications].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    : [];

  const renderContent = () => {
    switch (selectedMenu) {
      case "applied":
        if (isLoadingApplications) {
          return <Spin tip="Đang tải danh sách đơn ứng tuyển..." />;
        }
        if (
          isErrorApplications ||
          !sortedApplications ||
          sortedApplications.length === 0
        ) {
          return (
            <EmptyState>
              <EmptyText>Bạn chưa ứng tuyển công việc nào!</EmptyText>
              <ExploreButton onClick={() => navigate("/jobs")}>
                Khám phá việc làm
              </ExploreButton>
            </EmptyState>
          );
        }
        return (
          <ApplicationGrid applications={sortedApplications} fullWidth={true} />
        );
      case "resumeAnalysisHistory":
        return (
          <EmptyState>
            <EmptyText>
              Chưa có lịch sử! Khám phá việc làm để phân tích CV
            </EmptyText>
            <ExploreButton onClick={() => navigate("/jobs")}>
              Khám phá việc làm
            </ExploreButton>
          </EmptyState>
        );
      case "saved":
        if (isLoadingSavedJobPosts || isLoadingCompanies) {
          return <Spin tip="Đang tải bài đăng đã lưu..." />;
        }
        if (!sortedJobPosts || sortedJobPosts.length === 0) {
          return (
            <EmptyState>
              <EmptyText>Bạn chưa lưu việc làm nào!</EmptyText>
              <ExploreButton onClick={() => navigate("/jobs")}>
                Khám phá việc làm
              </ExploreButton>
            </EmptyState>
          );
        }
        return <JobGrid jobs={sortedJobPosts} fullWidth={true} />;
      default:
        return null;
    }
  };

  return (
    <StyledCard>
      <StyledMenu
        mode="horizontal"
        selectedKeys={[selectedMenu]}
        onClick={onMenuClick}
      >
        <Menu.Item key="applied" icon={<FileTextOutlined />}>
          Theo dõi đơn ứng tuyển
        </Menu.Item>
        <Menu.Item key="saved" icon={<HeartOutlined />}>
          Việc làm đã lưu
        </Menu.Item>
        <Menu.Item key="resumeAnalysisHistory" icon={<HistoryOutlined />}>
          Lịch sử phân tích CV
        </Menu.Item>
      </StyledMenu>
      <MenuContent>{renderContent()}</MenuContent>
    </StyledCard>
  );
};

export default JobMenuCard;
