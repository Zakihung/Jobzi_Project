import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoSectionWrapper = styled.div`
  flex-shrink: 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
  font-weight: 600;
  cursor: pointer;
`;

const LogoImage = styled.img`
  height: 40px;
  @media (max-width: 480px) {
    height: 32px;
  }
`;

const LogoSection = ({ setCurrent }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setCurrent("home");
    navigate("/");
  };

  return (
    <LogoSectionWrapper>
      <Logo onClick={handleLogoClick}>
        <LogoImage src="/src/assets/logo/logo_ngang.png" alt="Jobzi Logo" />
      </Logo>
    </LogoSectionWrapper>
  );
};

export default LogoSection;
