import React from "react";
import { Row, Col, Typography, Button, Skeleton } from "antd";
import { FireOutlined, RightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import JobGrid from "../../../job/components/templates/JobGrid";
import { useNavigate } from "react-router-dom";
import useGetListCompany from "../../../company/hooks/Company/useGetListCompany";
import useGetFilteredJobPosts from "../../../postjob/hooks/Job_Post/useGetFilteredJobPosts";

const { Title, Text } = Typography;

const FeaturedJobsSectionWrapper = styled.section`
  padding: 1rem;
  margin-top: 1rem;
  background: #f8f9fa;
  border-radius: 16px;
  @media (min-width: 768px) {
    padding: 2rem;
    margin-top: 2rem;
    border-radius: 24px;
  }
`;

const SectionContainer = styled.div`
  margin: 0;
  padding: 0;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0f0f0;
  @media (min-width: 768px) {
    margin-bottom: 24px;
    padding-bottom: 16px;
  }
`;

const SectionTitleGroup = styled.div`
  flex: 1;
`;

const SectionTitle = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    margin: 0 !important;
    display: flex;
    align-items: center;
    gap: 8px;
    @media (min-width: 768px) {
      font-size: 36px !important;
      gap: 12px;
    }
  }
`;

const SectionIcon = styled(FireOutlined)`
  color: #577cf6;
  font-size: 24px;
  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled(Text)`
  color: #666;
  font-size: 14px;
  margin-top: 4px;
  display: block;
  @media (min-width: 768px) {
    font-size: 16px;
    margin-top: 8px;
  }
`;

const ViewAllBtn = styled(Button)`
  && {
    color: #577cf6 !important;
    border-color: #577cf6 !important;
    font-weight: 600;
    height: 32px;
    padding: 0 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover {
      background: #577cf6 !important;
      color: #ffffff !important;
    }
    @media (min-width: 768px) {
      height: 40px;
      padding: 0 20px;
    }
  }
`;

const SkeletonContainer = styled.div`
  padding: 12px;
  @media (min-width: 768px) {
    padding: 16px;
  }
`;

const FeaturedJobsSection = () => {
  const navigate = useNavigate();
  const { data: jobPosts, isLoading: isLoadingJobs } = useGetFilteredJobPosts();
  const { data: companies, isLoading: isLoadingCompanies } =
    useGetListCompany();

  const featuredJobs = React.useMemo(() => {
    if (!jobPosts || !companies) return [];

    return jobPosts
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6)
      .map((job) => {
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
          tags: job?.skills,
          saved: false,
          posted: job?.createdAt,
        };
      });
  }, [jobPosts, companies]);

  if (isLoadingJobs || isLoadingCompanies) {
    return (
      <FeaturedJobsSectionWrapper>
        <SectionContainer>
          <SectionHeader>
            <SectionTitleGroup>
              <Skeleton active title={{ width: "30%" }} paragraph={false} />
            </SectionTitleGroup>
            <Skeleton.Button active size="large" />
          </SectionHeader>
          <SkeletonContainer>
            <Row gutter={[16, 16]}>
              {Array(6)
                .fill()
                .map((_, index) => (
                  <Col key={index} xs={24} sm={12} md={8}>
                    <Skeleton
                      active
                      avatar={{ size: 70, shape: "square" }}
                      paragraph={{ rows: 3 }}
                    />
                  </Col>
                ))}
            </Row>
          </SkeletonContainer>
        </SectionContainer>
      </FeaturedJobsSectionWrapper>
    );
  }

  return (
    <FeaturedJobsSectionWrapper>
      <SectionContainer>
        <SectionHeader>
          <SectionTitleGroup>
            <SectionTitle level={2}>
              <SectionIcon />
              Việc làm nổi bật
            </SectionTitle>
          </SectionTitleGroup>
          <ViewAllBtn type="primary" ghost onClick={() => navigate("/jobs")}>
            Xem tất cả <RightOutlined />
          </ViewAllBtn>
        </SectionHeader>
        <JobGrid jobs={featuredJobs} />
      </SectionContainer>
    </FeaturedJobsSectionWrapper>
  );
};

export default FeaturedJobsSection;
