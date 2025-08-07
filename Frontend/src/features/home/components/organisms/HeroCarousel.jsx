import React from "react";
import { Carousel, Typography, Skeleton } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

const HeroCarouselWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  @media (min-width: 768px) {
    border-radius: 20px;
  }
`;

const CarouselItem = styled.div`
  height: 300px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  @media (min-width: 768px) {
    height: 540px;
    border-radius: 20px;
  }
`;

const CarouselItemIt = styled(CarouselItem)`
  background: linear-gradient(135deg, #577cf6 0%, #667eea 100%);
`;

const CarouselItemStartup = styled(CarouselItem)`
  background: linear-gradient(135deg, #36cfc9 0%, #4ecdc4 100%);
`;

const CarouselItemAI = styled(CarouselItem)`
  background: linear-gradient(135deg, #95e1d3 0%, #36cfc9 100%);
`;

const CarouselContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
  padding: 20px;
  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const CarouselIcon = styled.div`
  font-size: 32px;
  margin-bottom: 12px;
  display: block;
  @media (min-width: 768px) {
    font-size: 48px;
    margin-bottom: 20px;
  }
`;

const CarouselTitle = styled(Title)`
  && {
    color: #ffffff !important;
    font-size: 20px !important;
    font-weight: 700 !important;
    margin-bottom: 12px !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    @media (min-width: 768px) {
      font-size: 28px !important;
      margin-bottom: 16px !important;
    }
  }
`;

const CarouselSubtitle = styled(Text)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  line-height: 1.5;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const SkeletonContainer = styled.div`
  padding: 20px;
  height: 300px;
  border-radius: 16px;
  background: linear-gradient(135deg, #577cf6 0%, #667eea 100%);
  @media (min-width: 768px) {
    height: 540px;
    border-radius: 20px;
    padding: 40px;
  }
`;

const HeroCarousel = () => {
  const carouselItems = [
    {
      title: "Tìm việc làm IT tốt nhất",
      subtitle: "Nhiều cơ hội việc làm đang chờ bạn",
      icon: "💻",
      className: "it",
    },
    {
      title: "AI thông minh",
      subtitle: "Tăng đáng kể cơ hội trúng tuyển cho ứng viên",
      icon: "💡",
      className: "ai",
    },
    {
      title: "Khởi nghiệp cùng Startup",
      subtitle: "Gia nhập các công ty startup đầy tiềm năng",
      icon: "🚀",
      className: "startup",
    },
  ];

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const getCarouselItem = (className) => {
    switch (className) {
      case "it":
        return CarouselItemIt;
      case "startup":
        return CarouselItemStartup;
      case "ai":
        return CarouselItemAI;
      default:
        return CarouselItem;
    }
  };

  if (isLoading) {
    return (
      <HeroCarouselWrapper>
        <SkeletonContainer>
          <Skeleton active avatar={{ size: 80 }} paragraph={{ rows: 2 }} />
        </SkeletonContainer>
      </HeroCarouselWrapper>
    );
  }

  return (
    <HeroCarouselWrapper>
      <Carousel autoplay autoplaySpeed={2000} effect="fade">
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
