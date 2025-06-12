import React from "react";
import { Carousel, Typography } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

const HeroCarouselWrapper = styled.div`
  margin-top: 20px;
`;

const CarouselItem = styled.div`
  height: 550px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const CarouselItemIt = styled(CarouselItem)`
  background: linear-gradient(135deg, #577cf6 0%, #667eea 100%);
`;

const CarouselItemStartup = styled(CarouselItem)`
  background: linear-gradient(135deg, #36cfc9 0%, #4ecdc4 100%);
`;

const CarouselItemRemote = styled(CarouselItem)`
  background: linear-gradient(135deg, #95e1d3 0%, #36cfc9 100%);
`;

const CarouselContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
  padding: 40px;
`;

const CarouselIcon = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  display: block;
`;

const CarouselTitle = styled(Title)`
  && {
    color: #ffffff !important;
    font-size: 28px !important;
    font-weight: 700 !important;
    margin-bottom: 16px !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const CarouselSubtitle = styled(Text)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1.5;
`;

const HeroCarousel = () => {
  const carouselItems = [
    {
      title: "Tìm việc làm IT tốt nhất",
      subtitle: "Hơn 10,000 cơ hội việc làm đang chờ bạn",
      icon: "💻",
      className: "it",
    },
    {
      title: "Khởi nghiệp cùng Startup",
      subtitle: "Gia nhập các công ty startup đầy tiềm năng",
      icon: "🚀",
      className: "startup",
    },
    {
      title: "Remote Work - Tương lai của công việc",
      subtitle: "Làm việc từ xa với mức lương hấp dẫn",
      icon: "🏠",
      className: "remote",
    },
  ];

  const getCarouselItem = (className) => {
    switch (className) {
      case "it":
        return CarouselItemIt;
      case "startup":
        return CarouselItemStartup;
      case "remote":
        return CarouselItemRemote;
      default:
        return CarouselItem;
    }
  };

  return (
    <HeroCarouselWrapper>
      <Carousel autoplay autoplaySpeed={4000} effect="fade">
        {carouselItems.map((item, index) => {
          const StyledCarouselItem = getCarouselItem(item.className);
          return (
            <div key={index}>
              <StyledCarouselItem>
                <CarouselContent>
                  <CarouselIcon>{item.icon}</CarouselIcon>
                  <CarouselTitle level={3}>{item.title}</CarouselTitle>
                  <CarouselSubtitle>{item.subtitle}</CarouselSubtitle>
                </CarouselContent>
              </StyledCarouselItem>
            </div>
          );
        })}
      </Carousel>
    </HeroCarouselWrapper>
  );
};

export default HeroCarousel;
