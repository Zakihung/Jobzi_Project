import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import LogoSection from "../organisms/LogoSection";
import NavSection from "../organisms/NavSection";
import UserMenu from "../../features/auth/components/templates/UserMenu";
import MobileMenuButton from "../organisms/MobileMenuButton";
import { useNavigate } from "react-router-dom";

const { Header: AntHeader } = Layout;

const HeaderRow = styled(Row)`
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 999;
  background-color: #ffffff;
`;

const JobziHeader = styled(AntHeader)`
  background: #ffffff;
  padding: 0;
  height: 60px;
  line-height: 60px;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  @media (max-width: 1024px) {
    padding: 0 16px;
  }
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  // Xử lý sự kiện đăng nhập
  const handleSignin = () => {
    navigate("/signin");
  };

  // Xử lý sự kiện đăng ký
  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <HeaderRow className="headerRow" justify={"center"}>
      <Col span={21}>
        <JobziHeader>
          <HeaderContainer>
            <LogoSection setCurrent={setCurrent} />
            <NavSection current={current} setCurrent={setCurrent} />
            <MobileMenuButton />
            <UserMenu onSignin={handleSignin} onSignup={handleSignup} />
          </HeaderContainer>
        </JobziHeader>
      </Col>
    </HeaderRow>
  );
};

export default Header;
