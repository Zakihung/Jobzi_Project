import React, { useContext } from "react";
import { Card, Menu, List, Typography, Space, Spin, Button } from "antd";
import {
  FileTextOutlined,
  CalendarOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { AuthContext } from "../../../../contexts/auth.context";
import useGetJobPostSaveByCandidate from "../../../candidate/hooks/Candidate_Save_Job_Post/useGetJobPostSaveByCandidate";
import JobGrid from "../../../job/components/templates/JobGrid";
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

const StyledListItem = styled(List.Item)`
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

const ListIcon = styled.div`
  color: #577cf6;
  font-size: 20px;
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

const JobMenuCard = ({
  selectedMenu,
  onMenuClick,
  appliedJobs,
  interviews,
}) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const candidateId = auth?.user?.candidate_id;
  const { data: savedJobPosts, isLoading: isLoadingSavedJobPosts } =
    useGetJobPostSaveByCandidate(candidateId);

  // Sắp xếp savedJobPosts theo createdAt giảm dần (mới nhất trước)
  const sortedJobPosts = [...savedJobPosts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case "applied":
        return (
          <List
            dataSource={appliedJobs}
            renderItem={(item) => (
              <StyledListItem>
                <List.Item.Meta
                  avatar={
                    <ListIcon>
                      <FileTextOutlined />
                    </ListIcon>
                  }
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>{item.company}</Text>
                      <Text type="secondary">Gửi CV: {item.date}</Text>
                    </Space>
                  }
                />
              </StyledListItem>
            )}
          />
        );
      case "interviews":
        return (
          <List
            dataSource={interviews}
            renderItem={(item) => (
              <StyledListItem>
                <List.Item.Meta
                  avatar={
                    <ListIcon>
                      <CalendarOutlined />
                    </ListIcon>
                  }
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
              </StyledListItem>
            )}
          />
        );
      case "saved":
        if (isLoadingSavedJobPosts) {
          return <Spin tip="Đang tải bài đăng đã lưu..." />;
        }
        if (!savedJobPosts || savedJobPosts.length === 0) {
          return (
            <EmptyState>
              <EmptyText>Bạn chưa lưu việc làm nào!</EmptyText>
              <ExploreButton onClick={() => navigate("/jobs")}>
                Khám phá việc làm
              </ExploreButton>
            </EmptyState>
          );
        }
        return (
          <JobGrid
            jobs={
              sortedJobPosts?.map((item) => ({
                _id: item.job_post_id._id,
                title: item.job_post_id.title,
                locations: [
                  {
                    province:
                      item.job_post_id.locations?.[0]?.province ||
                      "Không xác định",
                  },
                ],
                min_salary_range: item.job_post_id.min_salary_range || 0,
                max_salary_range: item.job_post_id.max_salary_range || 0,
                skills: item.job_post_id.skills || [],
                createdAt: item.createdAt,
              })) || []
            }
            fullWidth={true}
          />
        );
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
          Đã gửi CV
        </Menu.Item>
        <Menu.Item key="interviews" icon={<CalendarOutlined />}>
          Phỏng vấn
        </Menu.Item>
        <Menu.Item key="saved" icon={<HeartOutlined />}>
          Đã lưu
        </Menu.Item>
      </StyledMenu>
      <MenuContent>{renderContent()}</MenuContent>
    </StyledCard>
  );
};

export default JobMenuCard;
