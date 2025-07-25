import React from "react";
import { Layout, Row, Col, Tabs, Spin, Typography, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CompanyBasicInfo from "../../features/company/components/templates/CompanyBasicInfo";
import CompanyInfo from "../../features/company/components/templates/CompanyInfo";
import CompanyJobPosition from "../../features/company/components/templates/CompanyJobPosition";
import useGetCompanyById from "../../features/company/hooks/Company/useGetCompanyById";

const { TabPane } = Tabs;
const { Text } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    font-size: 16px;
    font-weight: 600;
  }
`;

const ErrorText = styled(Text)`
  color: #ff4d4f;
  font-size: 16px;
  text-align: center;
  display: block;
  margin: 40px 0;
`;

const SkeletonContainer = styled.div`
  padding: 24px;
  background: #ffffff;
  border-radius: 8px;
`;

const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { data: companyData, isLoading, error } = useGetCompanyById(companyId);

  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Senior React Developer",
      location: "Hồ Chí Minh",
      salary: "20-30 triệu VNĐ",
      type: "Full-time",
      posted: "2 ngày trước",
    },
    {
      id: 2,
      title: "Backend Developer (Node.js)",
      location: "Hồ Chí Minh",
      salary: "18-25 triệu VNĐ",
      type: "Full-time",
      posted: "3 ngày trước",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      salary: "15-20 triệu VNĐ",
      type: "Part-time",
      posted: "5 ngày trước",
    },
  ];

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  // Xử lý dữ liệu công ty từ API
  const company = companyData
    ? {
        id: companyData._id,
        name: companyData.name,
        logo:
          companyData.logo ||
          "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png",
        company_industry: companyData.company_industry_id?.name || "",
        website_url: companyData.website_url || "",
        min_size: companyData.min_size || 0,
        max_size: companyData.max_size || 0,
        address: companyData.address || "",
        province: companyData.province_id?.name || "",
        introduction: companyData.introduction || "",
        businessOperations: companyData.businessOperations || [],
        regulations: companyData.regulations || [],
        benefits: companyData.benefits || [],
      }
    : null;

  return (
    <StyledLayout>
      <Row justify="center">
        <Col span={21}>
          <Row
            style={{
              background: "#f8f9fa",
              padding: "16px",
              borderRadius: "24px",
            }}
          >
            {/* Basic Company Info */}
            <Col span={24}>
              {isLoading ? (
                <SkeletonContainer>
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </SkeletonContainer>
              ) : error || !company ? (
                <ErrorText>
                  {error?.response?.data?.message ||
                    "Không tìm thấy thông tin công ty"}
                </ErrorText>
              ) : (
                <CompanyBasicInfo company={company} />
              )}
            </Col>

            {/* Tabs and Content */}
            {!isLoading && !error && company ? (
              <Col span={24}>
                <StyledTabs defaultActiveKey="introduction">
                  <TabPane tab="Giới thiệu công ty" key="introduction">
                    <CompanyInfo company={company} />
                  </TabPane>
                  <TabPane tab="Vị trí tuyển dụng" key="jobs">
                    <CompanyJobPosition
                      jobs={jobs}
                      loading={false}
                      onViewJob={handleViewJob}
                    />
                  </TabPane>
                </StyledTabs>
              </Col>
            ) : isLoading ? (
              <Col span={24}>
                <SkeletonContainer>
                  <Skeleton active paragraph={{ rows: 6 }} />
                </SkeletonContainer>
              </Col>
            ) : null}
          </Row>
        </Col>
      </Row>
    </StyledLayout>
  );
};

export default CompanyDetailPage;
