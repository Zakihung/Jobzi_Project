import React from "react";
import { Layout, Row, Col, Typography, Space, Divider, Button } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  XOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Footer.module.css";

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
  const navigate = useNavigate();

  const quickLinks = [
    { label: "Trang chủ", path: "/" },
    { label: "Tìm kiếm việc làm", path: "/search" },
    { label: "Danh sách công ty", path: "/companies" },
  ];

  const supportLinks = [
    { label: "Trung tâm trợ giúp", path: "/help" },
    { label: "Hướng dẫn sử dụng", path: "/guide" },
    { label: "Chính sách bảo mật", path: "/privacy" },
    { label: "Điều khoản dịch vụ", path: "/terms" },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <AntFooter className={styles.footer}>
      <div className={styles.footerContainer}>
        <Row gutter={[32, 32]} justify={"center"}>
          {/* Column 1: Logo and Description */}
          <Col xs={24} sm={12} lg={5}>
            <div className={styles.footerLogoSection}>
              <div className={styles.logoContainer}>
                <img
                  src="/src/assets/logo/logo.png"
                  alt="Jobzi Logo"
                  className={styles.footerLogo}
                />
              </div>
              <Text className={styles.brandName}>JOBZI</Text>
              <Text className={styles.footerDescription}>
                Nền tảng tuyển dụng top 1tr của Việt Nam, kết nối ứng viên tài
                năng với các cơ hội việc làm hấp dẫn từ những công ty uy tín
                nhất.
              </Text>
            </div>
          </Col>

          {/* Column 2: Quick Links */}
          <Col xs={24} sm={12} lg={3}>
            <div className={styles.footerSection}>
              <Title level={5} className={styles.footerTitle}>
                Liên kết nhanh
              </Title>
              <Space direction="vertical" className={styles.footerLinks}>
                {quickLinks.map((link) => (
                  <Link
                    key={link.path}
                    className={styles.footerLink}
                    onClick={() => handleNavigate(link.path)}
                  >
                    {link.label}
                  </Link>
                ))}
              </Space>
            </div>
          </Col>

          {/* Column 3: Support Links */}
          <Col xs={24} sm={12} lg={3}>
            <div className={styles.footerSection}>
              <Title level={5} className={styles.footerTitle}>
                Hỗ trợ
              </Title>
              <Space direction="vertical" className={styles.footerLinks}>
                {supportLinks.map((link) => (
                  <Link
                    key={link.path}
                    className={styles.footerLink}
                    onClick={() => handleNavigate(link.path)}
                  >
                    {link.label}
                  </Link>
                ))}
              </Space>
            </div>
          </Col>

          {/* Column 4: Contact */}
          <Col xs={24} sm={12} lg={7}>
            <div className={styles.footerSection}>
              <Title level={5} className={styles.footerTitle}>
                Liên hệ
              </Title>
              <Space direction="vertical" className={styles.footerContact}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <MailOutlined className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <Text className={styles.contactLabel}>Email</Text>
                    <Text className={styles.contactValue}>
                      support@hungb2110124.com
                    </Text>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <PhoneOutlined className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <Text className={styles.contactLabel}>Hotline</Text>
                    <Text className={styles.contactValue}>+84 123 456 789</Text>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <EnvironmentOutlined className={styles.contactIcon} />
                  </div>
                  <div className={styles.contactInfo}>
                    <Text className={styles.contactLabel}>Địa chỉ</Text>
                    <Text className={styles.contactValue}>
                      Khu II, Đại học Cần Thơ
                    </Text>
                  </div>
                </div>
              </Space>
            </div>
          </Col>
          {/* Column 5: Social Media */}
          <Col xs={24} sm={12} lg={4}>
            <Title level={5} className={styles.socialTitle}>
              Cộng đồng Jobzi
            </Title>
            <div className={styles.socialIcons}>
              <Button
                type="primary"
                shape="circle"
                icon={<FacebookOutlined />}
                className={styles.socialIcon}
                style={{ backgroundColor: "#4267B2" }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<LinkedinOutlined />}
                className={styles.socialIcon}
                style={{ backgroundColor: "#0077B5" }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<XOutlined />}
                className={styles.socialIcon}
                style={{ backgroundColor: "#272c30" }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<InstagramOutlined />}
                className={styles.socialIcon}
                style={{ backgroundColor: "#E4405F" }}
              />
            </div>
          </Col>
        </Row>
        <Divider className={styles.footerDivider} />

        <div className={styles.footerBottom}>
          <Text className={styles.footerCopyright}>
            © {new Date().getFullYear()} Copyright by Jobzi. Made with love in
            Vietnam
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;
