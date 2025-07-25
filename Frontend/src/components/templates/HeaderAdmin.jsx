import { Layout, Typography } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { LogoutOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const StyledHeader = styled(AntHeader)`
  background: #ffffff;
  padding: 0 24px;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const StyledLogo = styled.img`
  height: 40px;
  margin-right: 16px;
`;

const LogoutButton = styled.div`
  cursor: pointer;
  color: #577cf6;
  font-size: 16px;
  &:hover {
    color: #3654d6;
  }
`;

const HeaderAdmin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <StyledHeader>
      <HeaderContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <StyledLogo
            src="https://res.cloudinary.com/luanvancloudinary/image/upload/v1753431096/logo_qnkyln.png"
            alt="Logo"
          />
          <Title level={3} style={{ margin: 0, color: "#577cf6" }}>
            Quản trị viên
          </Title>
        </div>
        <LogoutButton onClick={handleLogout}>
          <LogoutOutlined /> Đăng xuất
        </LogoutButton>
      </HeaderContainer>
    </StyledHeader>
  );
};

export default HeaderAdmin;
