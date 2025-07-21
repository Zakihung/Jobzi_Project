import React, { useState } from "react";
import { Layout, Row, Col, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CompanyBasicInfo from "../../features/company/components/templates/CompanyBasicInfo";
import CompanyInfo from "../../features/company/components/templates/CompanyInfo";
import CompanyJobPosition from "../../features/company/components/templates/CompanyJobPosition";

const { TabPane } = Tabs;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: #ffffff;
  padding: 0;
`;

const StyledTabs = styled(Tabs)`
  .ant-tabs-tab {
    font-weight: 600;
  }
`;

const CompanyDetailPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Sample company data
  const company = {
    id: 1,
    name: "Công ty ABC",
    logo: "https://res.cloudinary.com/luanvancloudinary/image/upload/v1750609630/CompanyLogoDefault_c61eos.png",
    company_industry_id: "",
    website_url: "",
    min_size: "100",
    max_size: "500",
    address: "Tòa nhà ABC, Quận 1",
    province_id: "",
    introduction:
      "Công ty ABC là một công ty công nghệ hàng đầu, chuyên cung cấp các giải pháp phần mềm sáng tạo. Với hơn 10 năm kinh nghiệm, chúng tôi tự hào mang đến các sản phẩm và dịch vụ chất lượng cao cho khách hàng toàn cầu.",
    businessOperations: [
      "Phát triển phần mềm tùy chỉnh.",
      "Giải pháp trí tuệ nhân tạo và học máy.",
      "Dịch vụ tư vấn công nghệ thông tin.",
      "Quản lý hệ thống đám mây.",
    ],
    regulations: [
      "Tuân thủ quy định làm việc từ 9:00 - 18:00, Thứ Hai - Thứ Sáu.",
      "Khuyến khích môi trường làm việc minh bạch và hợp tác.",
      "Đánh giá hiệu suất định kỳ hàng quý.",
    ],
    benefits: [
      "Bảo hiểm sức khỏe toàn diện.",
      "Thưởng hiệu suất và các dịp lễ, Tết.",
      "Cơ hội đào tạo và phát triển nghề nghiệp.",
      "Môi trường làm việc năng động, sáng tạo.",
    ],
  };

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
              <CompanyBasicInfo company={company} />
            </Col>

            {/* Tabs and Content */}
            <Col span={24}>
              <StyledTabs defaultActiveKey="introduction">
                <TabPane tab="Giới thiệu công ty" key="introduction">
                  <CompanyInfo company={company} />
                </TabPane>
                <TabPane tab="Vị trí tuyển dụng" key="jobs">
                  <CompanyJobPosition
                    jobs={jobs}
                    loading={loading}
                    onViewJob={handleViewJob}
                  />
                </TabPane>
              </StyledTabs>
            </Col>
          </Row>
        </Col>
      </Row>
    </StyledLayout>
  );
};

export default CompanyDetailPage;
