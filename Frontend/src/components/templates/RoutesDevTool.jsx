import { Popover, Button } from "antd";
import styled from "styled-components";

// Styled components
const FloatingButton = styled(Button)`
  position: fixed !important;
  bottom: 70px;
  right: 15px;
  z-index: 1111;
  background-color: #ffffff !important;
  border: 2px solid #577cf6;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;

  img {
    width: 70%;
    height: 70%;
    object-fit: contain;
  }

  &:hover {
    background-color: #ffffff !important;
  }
`;

// Container cho toàn bộ nội dung popover
const PopoverContainer = styled.div`
  min-width: 200px;
`;

// Tiêu đề cố định
const PopoverHeader = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 8px;
`;

// Danh sách có thể cuộn
const NavigationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 200px; /* Giảm chiều cao để tiêu đề không bị ảnh hưởng */
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #577cf6 #f6f8ff;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f6f8ff;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #577cf6;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #4c6ef5;
  }
`;

const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.85);
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #577cf6;
  }
`;

const RoutesDevTool = () => {
  const navigationItems = [
    { path: "/", label: "Trang chủ" },
    { path: "/search", label: "Tìm kiếm việc làm" },
    { path: "/companies", label: "Danh sách công ty" },
    { path: "/companydetail", label: "Chi tiết công ty" },
    { path: "/jobpostdetail", label: "Chi tiết tin" },
    { path: "/signin", label: "Đăng nhập ứng viên" },
    { path: "/signup", label: "Đăng ký ứng viên" },
    { path: "/profile", label: "Profile ứng viên" },
    { path: "/online-resume", label: "Resume ứng viên" },
    { path: "employer-signin", label: "Đăng nhập nhà tuyển dụng" },
    { path: "employer", label: "Dashboard nhà tuyển dụng" },
    { path: "employer/postjob", label: "Đăng tin tuyển dụng" },
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const content = (
    <PopoverContainer>
      <PopoverHeader>DevTool Nav Website</PopoverHeader>
      <NavigationList>
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavigationItem>
        ))}
      </NavigationList>
    </PopoverContainer>
  );

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      placement="leftTop"
      arrow={false}
    >
      <FloatingButton type="primary" shape="circle" size="large">
        <img src="/src/assets/logo/logo.png" alt="Jobzi Logo" />
      </FloatingButton>
    </Popover>
  );
};

export default RoutesDevTool;
