import React, { useState } from "react";
import { Layout, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import SigninRequiredModal from "../../components/organisms/SigninRequiredModal";
import { useAuth } from "../../contexts/auth.context";
import JobPostTitle from "../../features/job/components/templates/JobPostTitle";
import JobPostDetail from "../../features/job/components/templates/JobPostDetail";
import JobPostCompany from "../../features/job/components/templates/JobPostCompany";
import JobPostGeneralInfo from "../../features/job/components/templates/JobPostGeneralInfo";
import styled from "styled-components";

const { Content } = Layout;

const StyledLayout = styled(Layout)`
  background: #ffffff;
  padding: 0;
`;

const StyledContent = styled(Content)`
  padding: 0;
  background: #ffffff;
`;

const StyledRow = styled(Row)`
  margin: 0 auto;
  padding: 1.5rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const NoResults = styled.div`
  color: #666;
  font-size: 16px;
  text-align: center;
  display: block;
  margin: 40px 0;
`;

const JobPostDetailPage = () => {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Sample job post data
  const job = {
    id: 1,
    title:
      "Senior React Developer Senior React Developer Senior React Developer Senior React Developer",
    company: "Công ty ABC",
    logo: "https://via.placeholder.com/80/577cf6/ffffff?text=ABC",
    location: "Hồ Chí Minh",
    salary: "20-30 triệu VNĐ",
    type: "Full-time",
    experience: "3-5 năm",
    posted: "2 ngày trước",
    deadline: "30/12/2024",
    description:
      "Chúng tôi đang tìm kiếm một lập trình viên React có kinh nghiệm để tham gia đội ngũ phát triển sản phẩm công nghệ cao. Bạn sẽ làm việc với các công nghệ hiện đại và đóng góp vào việc xây dựng các ứng dụng web tiên tiến.",
    requirements: [
      "Tốt nghiệp đại học chuyên ngành CNTT hoặc liên quan.",
      "Có ít nhất 3 năm kinh nghiệm với React, Redux, và các thư viện liên quan.",
      "Hiểu biết về RESTful APIs và GraphQL.",
      "Kỹ năng giao tiếp tốt, làm việc nhóm hiệu quả.",
    ],
    benefits: [
      "Mức lương cạnh tranh, thưởng dự án.",
      "Bảo hiểm sức khỏe toàn diện.",
      "Môi trường làm việc năng động, sáng tạo.",
      "Cơ hội tham gia các khóa đào tạo quốc tế.",
    ],
    detailedLocation: "Tòa nhà ABC, Quận 1, TP. Hồ Chí Minh",
    workingHours: "Thứ Hai - Thứ Sáu, 9:00 - 18:00",
    tags: ["React", "JavaScript", "Frontend", "Web Development"],
    level: "Nhân viên",
    number: 1,
    gender: "unspecified",
    expertise: "Senior",
    education: "Đại học",
    workType: "Toàn thời gian",
  };

  // Sample company data
  const company = {
    name: "Công ty ABC Công ty ABC Công ty ABC Công ty ABC Công ty ABC Công ty ABC",
    industry: "Công nghệ thông tin",
    size: "100-500 nhân viên",
    location: "Tòa nhà ABC, Quận 1, TP. Hồ Chí Minh",
    rating: 4.2,
    reviews: 150,
  };

  // Xử lý lưu công việc
  const handleSaveJob = () => {
    setIsSaved(!isSaved);
  };

  // Xử lý ứng tuyển
  const handleApply = () => {
    if (isLoggedIn) {
      navigate("/apply");
    } else {
      setModalVisible(true);
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setModalVisible(false);
  };

  // Xử lý xem công ty
  const handleViewCompany = () => {
    navigate("/companies/abc");
  };

  if (loading) {
    return (
      <StyledLayout>
        <StyledContent>
          <LoadingContainer>
            <Spin size="large" />
          </LoadingContainer>
        </StyledContent>
      </StyledLayout>
    );
  }

  if (!job) {
    return (
      <StyledLayout>
        <StyledContent>
          <NoResults>Không tìm thấy thông tin công việc</NoResults>
        </StyledContent>
      </StyledLayout>
    );
  }

  return (
    <StyledLayout>
      <StyledContent>
        <Row justify={"center"}>
          <Col
            span={21}
            style={{ backgroundColor: "#f8f9fa", borderRadius: 24 }}
          >
            <StyledRow gutter={[24, 24]} justify="center">
              {/* Left Section */}
              <Col span={17}>
                {/* Row 1 Col 1: Job Title */}
                <JobPostTitle
                  job={job}
                  isSaved={isSaved}
                  onSaveJob={handleSaveJob}
                  onApply={handleApply}
                />

                {/* Row 2 Col 1: Job Detail */}
                <JobPostDetail job={job} />
              </Col>

              {/* Right Section */}
              <Col span={7}>
                {/* Row 1 Col 2: Company Info */}
                <JobPostCompany
                  job={job}
                  company={company}
                  onViewCompany={handleViewCompany}
                />

                {/* Row 2 Col 2: General Info */}
                <JobPostGeneralInfo job={job} />
              </Col>
            </StyledRow>

            <SigninRequiredModal
              visible={modalVisible}
              onCancel={handleModalCancel}
            />
          </Col>
        </Row>
      </StyledContent>
    </StyledLayout>
  );
};

export default JobPostDetailPage;
