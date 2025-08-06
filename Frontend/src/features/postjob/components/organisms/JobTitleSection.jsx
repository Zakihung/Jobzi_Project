import { Card, Typography, Input } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 16px;
  border: none;
  background: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
`;

const StyledTitle = styled(Title)`
  color: #1a1a1a !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;

  @media (max-width: 768px) {
    font-size: 20px !important;
  }

  @media (max-width: 576px) {
    font-size: 18px !important;
  }
`;

const JobTitleSection = ({
  control,
  errors,
  sectionRefs,
  completedSections,
  setCompletedSections,
  disabled,
}) => {
  const maxLength = 100;

  return (
    <StyledCard ref={sectionRefs.title}>
      <StyledTitle level={3}>Tiêu đề tin tuyển dụng</StyledTitle>
      <Controller
        name="title"
        control={control}
        rules={{
          required: "Vui lòng nhập tiêu đề",
          maxLength: {
            value: maxLength,
            message: `Tiêu đề không được vượt quá ${maxLength} ký tự`,
          },
        }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              placeholder="Nhập tiêu đề tin tuyển dụng"
              size="large"
              maxLength={maxLength}
              disabled={disabled}
              onChange={(e) => {
                field.onChange(e);
                const value = e.target.value;
                if (
                  value &&
                  !completedSections.includes("Tiêu đề tin tuyển dụng")
                ) {
                  setCompletedSections([
                    ...completedSections,
                    "Tiêu đề tin tuyển dụng",
                  ]);
                } else if (
                  !value &&
                  completedSections.includes("Tiêu đề tin tuyển dụng")
                ) {
                  setCompletedSections(
                    completedSections.filter(
                      (section) => section !== "Tiêu đề tin tuyển dụng"
                    )
                  );
                }
              }}
            />
          </>
        )}
      />
      {errors.title && <Text type="danger">{errors.title.message}</Text>}
    </StyledCard>
  );
};

export default JobTitleSection;
