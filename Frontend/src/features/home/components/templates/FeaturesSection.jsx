import React from "react";
import { Row, Col, Typography } from "antd";
import {
  AppstoreOutlined,
  RocketOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import FeatureItem from "../organisms/FeatureItem";

const { Title, Text } = Typography;

const FeaturesSectionWrapper = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f5ff 100%);
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 48px;
`;

const SectionTitle = styled(Title)`
  && {
    color: #1a1a1a !important;
    font-size: 36px !important;
    font-weight: 700 !important;
    margin: 0 !important;
  }
`;

const SectionSubtitle = styled(Text)`
  color: #666;
  font-size: 16px;
`;

const FeaturesSection = () => {
  const features = [
    {
      icon: <BulbOutlined />,
      title: "AI thông minh",
      description:
        "Công nghệ AI giúp ứng viên phân tích hồ sơ và gợi ý chỉnh sửa để tăng cơ hội trúng tuyển",
    },
    {
      icon: <AppstoreOutlined />,
      title: "Giao diện thân thiện & đa nền tảng",
      description:
        "Giao diện dễ sử dụng, tương thích với mọi thiết bị từ máy tính đến di động",
    },
    {
      icon: <RocketOutlined />,
      title: "Ứng tuyển nhanh chóng",
      description:
        "Ứng tuyển chỉ với một cú click và theo dõi trạng thái đơn ứng tuyển real-time",
    },
  ];

  return (
    <FeaturesSectionWrapper>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle level={2}>Tại sao chọn chúng tôi?</SectionTitle>
          <SectionSubtitle>
            Những lý do khiến Jobzi trở thành lựa chọn hàng đầu
          </SectionSubtitle>
        </SectionHeader>
        <Row gutter={[32, 32]} justify="center">
          {features.map((feature, index) => (
            <Col xs={24} md={8} key={index}>
              <FeatureItem {...feature} />
            </Col>
          ))}
        </Row>
      </SectionContainer>
    </FeaturesSectionWrapper>
  );
};

export default FeaturesSection;
