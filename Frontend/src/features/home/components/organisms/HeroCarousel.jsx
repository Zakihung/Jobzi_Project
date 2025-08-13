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
  background-size: cover;
  background-position: center;
  @media (min-width: 768px) {
    height: 540px;
    border-radius: 20px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Tăng độ tối của lớp phủ */
    z-index: 1;
  }
`;

const CarouselItemIt = styled(CarouselItem)`
  /* IT */
  background-image: url("https://images.unsplash.com/photo-1519389950473-47ba0277781c");
`;

const CarouselItemStartup = styled(CarouselItem)`
  /* Startup */
  background-image: url("https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9");
`;

const CarouselItemApply = styled(CarouselItem)`
  background-image: url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40");
`;

const CarouselContent = styled.div`
  text-align: center;
  z-index: 2;
  position: relative;
  padding: 20px;
  transition: transform 0.3s ease; /* Hiệu ứng chuyển động nhẹ */
  @media (min-width: 768px) {
    padding: 40px;
  }
  &:hover {
    transform: scale(1.02); /* Phóng to nhẹ khi hover */
  }
`;

const CarouselTitle = styled(Title)`
  && {
    color: #ffffff !important;
    font-size: 24px !important;
    font-weight: 700 !important;
    margin-bottom: 16px !important;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    @media (min-width: 768px) {
      font-size: 32px !important;
      margin-bottom: 20px !important;
    }
  }
`;

const CarouselSubtitle = styled(Text)`
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1.6;
  @media (min-width: 768px) {
    font-size: 18px;
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
      className: "it",
    },
    {
      title: "Ứng tuyển nhanh chóng",
      subtitle: "Nộp hồ sơ dễ dàng, nhận việc ngay hôm nay",
      className: "apply",
    },
    {
      title: "Khởi nghiệp cùng Startup",
      subtitle: "Gia nhập các công ty startup đầy tiềm năng",
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
      case "apply":
        return CarouselItemApply;
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
      <Carousel autoplay autoplaySpeed={4000} effect="fade">
        {carouselItems.map((item, index) => {
          const StyledCarouselItem = getCarouselItem(item.className);
          return (
            <div key={index}>
              <StyledCarouselItem>
                <CarouselContent>
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
