import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import LogoSection from "../organisms/LogoSection";
import NavSection from "../organisms/NavSection";
import UserMenu from "../../features/auth/components/templates/UserMenu";
import MobileMenuButton from "../organisms/MobileMenuButton";

const { Header: AntHeader } = Layout;

const HeaderRow = styled(Row)`
  position: sticky;
  top: 0;
  z-index: 1001;
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

  return (
    <HeaderRow className="headerRow">
      <Col span={2} />
      <Col span={20}>
        <JobziHeader>
          <HeaderContainer>
            <LogoSection setCurrent={setCurrent} />
            <NavSection current={current} setCurrent={setCurrent} />
            <MobileMenuButton />
            <UserMenu />
          </HeaderContainer>
        </JobziHeader>
      </Col>
      <Col span={2} />
    </HeaderRow>
  );
};

export default Header;
