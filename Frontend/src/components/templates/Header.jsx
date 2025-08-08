import React, { useState, useContext } from "react";
import { Layout, Row, Col } from "antd";
import styled from "styled-components";
import LogoSection from "../organisms/LogoSection";
import NavSection from "../organisms/NavSection";
import UserMenu from "../../features/auth/components/templates/UserMenu";
import MobileMenuButton from "../organisms/MobileMenuButton";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderRow className="headerRow" justify={"center"}>
      <Col span={21}>
        <JobziHeader>
          <HeaderContainer>
            <LogoSection setCurrent={setCurrent} />
            <NavSection
              current={current}
              setCurrent={setCurrent}
              isMobileMenuOpen={isMobileMenuOpen}
            />
            {auth?.isAuthenticated ? (
              <>
                <MobileMenuButton onClick={toggleMobileMenu} />
                <UserMenu onSignin={handleSignin} onSignup={handleSignup} />
              </>
            ) : (
              <>
                <UserMenu onSignin={handleSignin} onSignup={handleSignup} />
                <MobileMenuButton onClick={toggleMobileMenu} />
              </>
            )}
          </HeaderContainer>
        </JobziHeader>
      </Col>
    </HeaderRow>
  );
};

export default Header;
