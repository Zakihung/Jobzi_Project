import { Card, Col, Row, Typography, Statistic, Progress } from "antd";
import styled from "styled-components";
import {
  UserOutlined,
  FileTextOutlined,
  AppstoreOutlined,
  TrophyOutlined,
  RiseOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import useGetListUser from "../../features/auth/hooks/useGetListUser";
import useGetAllJobPosts from "../../features/postjob/hooks/Job_Post/useGetAllJobPosts";
import useGetIndustryGroups from "../../features/postjob/hooks/Industry_Group/useGetIndustryGroups";
import useGetJobPositions from "../../features/postjob/hooks/Job_Position/useGetJobPositions";

const { Title } = Typography;

const PageContainer = styled.div`
  background: #f8f9fa;
  min-height: 100vh;
  border-radius: 24px;
  padding: 0;
  margin: -32px;
`;

const ContentWrapper = styled.div`
  padding: 32px;
`;

const PageHeader = styled.div`
  margin-bottom: 32px;
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

const StatsGrid = styled(Row)`
  margin-bottom: 32px;
`;

const StatCard = styled(Card)`
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .ant-card-body {
    padding: 24px;
    position: relative;
  }
`;

const StatIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${(props) => props.bgColor || "#f0f7ff"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.iconColor || "#1890ff"};
  font-size: 20px;
`;

const StatTitle = styled.div`
  color: #8c8c8c;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const StatValue = styled.div`
  color: #262626;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 12px;
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${(props) => (props.isPositive ? "#52c41a" : "#ff4d4f")};
  font-size: 12px;
  font-weight: 500;
`;

const QuickStatsSection = styled.div`
  margin-top: 24px;
`;

const SectionTitle = styled.h3`
  color: #262626;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const QuickStatCard = styled(Card)`
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  .ant-card-body {
    padding: 20px;
  }
`;

const ProgressWrapper = styled.div`
  margin-top: 12px;
`;

const AdminDashboardPage = () => {
  const { data: userList } = useGetListUser();
  const { data: jobPosts } = useGetAllJobPosts();
  const { data: industryGroups } = useGetIndustryGroups();
  const { data: jobPositions } = useGetJobPositions();
  const mainStats = [
    {
      title: "Tổng số tài khoản",
      value: userList?.length || 0,
      trend: "+12%", // có thể tính toán nếu có dữ liệu so sánh
      isPositive: true,
      icon: UserOutlined,
      bgColor: "#f0f7ff",
      iconColor: "#1890ff",
    },
    {
      title: "Tin tuyển dụng",
      value: jobPosts?.length || 0,
      trend: "+8%",
      isPositive: true,
      icon: FileTextOutlined,
      bgColor: "#fff7e6",
      iconColor: "#fa8c16",
    },
    {
      title: "Ngành nghề",
      value: industryGroups?.length || 0,
      trend: "+2",
      isPositive: true,
      icon: AppstoreOutlined,
      bgColor: "#f6ffed",
      iconColor: "#52c41a",
    },
    {
      title: "Vị trí tuyển dụng",
      value: jobPositions?.length || 0,
      trend: "+15%",
      isPositive: true,
      icon: SolutionOutlined,
      bgColor: "#fff0f6",
      iconColor: "#eb2f96",
    },
  ];

  const monthlyStats = [
    {
      title: "Ứng viên mới (tháng này)",
      value: "124",
      trend: "+18%",
      isPositive: true,
      icon: TrophyOutlined,
      bgColor: "#f9f0ff",
      iconColor: "#722ed1",
    },
    {
      title: "Tin tuyển dụng mới",
      value: "28",
      trend: "+25%",
      isPositive: true,
      icon: RiseOutlined,
      bgColor: "#e6fffb",
      iconColor: "#13c2c2",
    },
  ];

  const isLoading = !userList || !jobPosts || !industryGroups || !jobPositions;

  if (isLoading) return <div>Đang tải dữ liệu...</div>;

  return (
    <PageContainer>
      <ContentWrapper>
        <PageHeader>
          <PageTitle level={2}>Tổng quan</PageTitle>
          <PageSubtitle>Tổng quan về hệ thống tuyển dụng việc làm</PageSubtitle>
        </PageHeader>

        <StatsGrid gutter={[24, 24]}>
          {mainStats.map((stat, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <StatCard>
                <StatIcon bgColor={stat.bgColor} iconColor={stat.iconColor}>
                  <stat.icon />
                </StatIcon>
                <StatTitle>{stat.title}</StatTitle>
                <StatValue>{stat.value}</StatValue>
              </StatCard>
            </Col>
          ))}
        </StatsGrid>

        {/* <QuickStatsSection>
          <SectionTitle>Thống kê theo tháng</SectionTitle>
          <Row gutter={[24, 24]}>
            {monthlyStats.map((stat, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <QuickStatCard>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "16px",
                    }}
                  >
                    <StatIcon
                      bgColor={stat.bgColor}
                      iconColor={stat.iconColor}
                      style={{
                        position: "relative",
                        top: 0,
                        right: 0,
                        width: "40px",
                        height: "40px",
                      }}
                    >
                      <stat.icon />
                    </StatIcon>
                    <div>
                      <StatTitle style={{ margin: 0, fontSize: "13px" }}>
                        {stat.title}
                      </StatTitle>
                      <StatValue style={{ fontSize: "24px", margin: 0 }}>
                        {stat.value}
                      </StatValue>
                    </div>
                  </div>
                  <StatTrend isPositive={stat.isPositive}>
                    <RiseOutlined />
                    {stat.trend} so với tháng trước
                  </StatTrend>
                  <ProgressWrapper>
                    <Progress
                      percent={75}
                      strokeColor={stat.iconColor}
                      trailColor="#f5f5f5"
                      showInfo={false}
                      strokeWidth={6}
                    />
                  </ProgressWrapper>
                </QuickStatCard>
              </Col>
            ))}

            <Col xs={24} sm={12} lg={8}>
              <QuickStatCard>
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <TrophyOutlined
                    style={{
                      fontSize: "48px",
                      color: "#faad14",
                      marginBottom: "16px",
                    }}
                  />
                  <StatTitle>Hiệu suất tổng thể</StatTitle>
                  <StatValue style={{ color: "#faad14" }}>Xuất sắc</StatValue>
                  <div style={{ marginTop: "12px", color: "#8c8c8c" }}>
                    Tăng trưởng ổn định trong 3 tháng
                  </div>
                </div>
              </QuickStatCard>
            </Col>
          </Row>
        </QuickStatsSection> */}
      </ContentWrapper>
    </PageContainer>
  );
};

export default AdminDashboardPage;
