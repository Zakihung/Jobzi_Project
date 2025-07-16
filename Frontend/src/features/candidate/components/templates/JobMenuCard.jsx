import React from "react";
import { Card, Menu, List, Typography, Space } from "antd";
import {
  FileTextOutlined,
  CalendarOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

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

const JobMenuCard = ({
  selectedMenu,
  onMenuClick,
  appliedJobs,
  interviews,
  followedJobs,
}) => {
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
      case "followed":
        return (
          <List
            dataSource={followedJobs}
            renderItem={(item) => (
              <StyledListItem>
                <List.Item.Meta
                  avatar={
                    <ListIcon>
                      <HeartOutlined />
                    </ListIcon>
                  }
                  title={<Text strong>{item.title}</Text>}
                  description={
                    <Space direction="vertical" size={4}>
                      <Text>{item.company}</Text>
                      <Text type="secondary">Quan tâm: {item.date}</Text>
                    </Space>
                  }
                />
              </StyledListItem>
            )}
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
        <Menu.Item key="followed" icon={<HeartOutlined />}>
          Quan tâm
        </Menu.Item>
      </StyledMenu>
      <MenuContent>{renderContent()}</MenuContent>
    </StyledCard>
  );
};

export default JobMenuCard;
