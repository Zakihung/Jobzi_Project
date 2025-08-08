import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoSectionWrapper = styled.div`
  flex-shrink: 0;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 5px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

const LogoImage = styled.img`
  height: 50px;
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 36px;
  }
`;

const LogoTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.1;
`;

const LogoText = styled.span`
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 3px;
  background: linear-gradient(to right, #7b9bff, #577cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 480px) {
    font-size: 22px;
    letter-spacing: 1.5px;
  }
`;

const Slogan = styled.span`
  font-size: 10px;
  font-weight: 500;
  background: linear-gradient(to right, #7b9bff, #577cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-top: 2px;

  @media (max-width: 480px) {
    font-size: 9px;
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
        <LogoImage
          src="https://res.cloudinary.com/luanvancloudinary/image/upload/v1753431096/logo_qnkyln.png"
          alt="Jobzi Icon"
        />
        <LogoTextWrapper>
          <LogoText>JOBZI</LogoText>
          <Slogan>Your Future. Our Mission.</Slogan>
        </LogoTextWrapper>
      </Logo>
    </LogoSectionWrapper>
  );
};

export default LogoSection;
