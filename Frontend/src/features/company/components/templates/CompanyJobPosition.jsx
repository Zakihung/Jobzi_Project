import React from "react";
import {
  Row,
  Col,
  Card,
  List,
  Avatar,
  Button,
  Space,
  Typography,
  Spin,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";
import dayjs from "dayjs";

const { Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  border: none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  background: #ffffff;
  padding: 24px;

  @media (max-width: 992px) {
    padding: 16px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const JobItem = styled(List.Item)`
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ViewJobButton = styled(Button)`
  &.ant-btn-primary {
    background: #577cf6 !important;
    border-color: #577cf6 !important;
    border-radius: 8px;
    font-weight: 600;
    height: 36px;
    transition: all 0.3s ease;

    &:hover {
      background: #4c6ef5 !important;
      border-color: #4c6ef5 !important;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(87, 124, 246, 0.3);
    }

    @media (max-width: 576px) {
      height: 32px;
      font-size: 13px;
    }
  }
`;

const NoResults = styled(Text)`
  color: #666;
  font-size: 16px;
  text-align: center;
  display: block;
  margin: 40px 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const formatSalary = (min, max, type) => {
  if (type === "Thỏa thuận") return "Thỏa thuận";
  return `${min?.toLocaleString()} - ${max?.toLocaleString()} triệu VND`;
};

// Hàm chuyển đổi date string sang dayjs object
const parseDateToDayjs = (dateValue) => {
  if (!dateValue) return null;

  // Nếu đã là dayjs object
  if (dayjs.isDayjs(dateValue)) {
    return dateValue;
  }

  // Nếu là moment object (để tương thích ngược)
  if (
    dateValue &&
    typeof dateValue === "object" &&
    dateValue._isAMomentObject
  ) {
    return dayjs(dateValue.toISOString());
  }

  // Nếu là string, thử parse với nhiều format
  if (typeof dateValue === "string") {
    // Thử parse ISO format trước
    let parsed = dayjs(dateValue);
    if (parsed.isValid()) {
      return parsed;
    }

    // Thử các format khác
    const formats = ["YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"];
    for (const format of formats) {
      parsed = dayjs(dateValue, format);
      if (parsed.isValid()) {
        return parsed;
      }
    }
  }

  return null;
};

const formatDateForDisplay = (dateValue) => {
  if (!dateValue) return "---";

  const parsed = parseDateToDayjs(dateValue);
  return parsed ? parsed.format("DD/MM/YYYY") : "---";
};

const CompanyJobPosition = ({ jobs, loading, onViewJob }) => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <StyledCard>
          {loading ? (
            <LoadingContainer>
              <Spin size="large" />
            </LoadingContainer>
          ) : jobs.length > 0 ? (
            <List
              dataSource={jobs}
              renderItem={(job) => (
                <JobItem
                  actions={[
                    <ViewJobButton
                      type="primary"
                      onClick={() => onViewJob(job?._id)}
                    >
                      Xem chi tiết
                    </ViewJobButton>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<CheckCircleOutlined />} />}
                    title={<Text strong>{job?.title}</Text>}
                    description={
                      <Space direction="vertical" size={4}>
                        <Text>
                          {job?.locations[0].address},{" "}
                          {job?.locations[0].province}
                        </Text>
                        <Text>
                          {formatSalary(
                            job?.min_salary_range,
                            job?.max_salary_range,
                            job?.salary_type
                          )}
                        </Text>
                        <Text type="secondary">
                          Đăng vào {formatDateForDisplay(job?.createdAt)}
                        </Text>
                      </Space>
                    }
                  />
                </JobItem>
              )}
            />
          ) : (
            <NoResults>Không có vị trí tuyển dụng nào</NoResults>
          )}
        </StyledCard>
      </Col>
    </Row>
  );
};

export default CompanyJobPosition;
