import React, { useRef } from "react";
import { Card, Typography, Input, Select, Button, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import styled from "styled-components";
import EditorSection from "../organisms/EditorSection";
import EditorToolbar from "../organisms/EditorToolbar";
import { PlusOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Option } = Select;

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

const SalaryRange = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;

    .ant-input {
      width: 100% !important;
    }
  }
`;

const LocationItem = styled.div`
  margin-bottom: 16px;
`;

const PostJobForm = ({
  sectionRefs,
  locations,
  handleLocationChange,
  addLocation,
  setCurrentStep,
  completedSections,
  setCompletedSections,
  allSections,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      industry: null,
      position: null,
      jobType: null,
      level: null,
      experience: null,
      salaryType: "Thỏa thuận",
      salaryRange: { min: "", max: "" },
      description: "",
      requirements: "",
      benefits: "",
      deadline: "",
      skills: [],
    },
  });

  const salaryType = watch("salaryType");

  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }),
      Underline,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("description", editor.getHTML());
      if (
        editor.getText().length > 0 &&
        !completedSections.includes("Nội dung tuyển dụng chi tiết")
      ) {
        setCompletedSections([
          ...completedSections,
          "Nội dung tuyển dụng chi tiết",
        ]);
      }
    },
  });

  const requirementsEditor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }),
      Underline,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("requirements", editor.getHTML());
      if (
        editor.getText().length > 0 &&
        !completedSections.includes("Yêu cầu ứng viên")
      ) {
        setCompletedSections([...completedSections, "Yêu cầu ứng viên"]);
      }
    },
  });

  const benefitsEditor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }),
      Underline,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      setValue("benefits", editor.getHTML());
      if (
        editor.getText().length > 0 &&
        !completedSections.includes("Quyền lợi ứng viên")
      ) {
        setCompletedSections([...completedSections, "Quyền lợi ứng viên"]);
      }
    },
  });

  const formRef = useRef(null);

  const onSubmit = async (data) => {
    const isValid = await trigger();
    if (
      isValid &&
      completedSections.length === allSections.length &&
      locations.every((loc) => loc.city && loc.address)
    ) {
      setCurrentStep(1);
      message.success("Đã hoàn thành bước 1, chuyển sang bước 2!");
    } else {
      message.warning("Vui lòng hoàn thành tất cả các mục trước khi tiếp tục!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <StyledCard ref={sectionRefs.title}>
        <StyledTitle level={3}>Tiêu đề tin tuyển dụng</StyledTitle>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Vui lòng nhập tiêu đề" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nhập tiêu đề tin tuyển dụng"
              size="large"
              onChange={(e) => {
                field.onChange(e);
                if (
                  e.target.value &&
                  !completedSections.includes("Tiêu đề tin tuyển dụng")
                ) {
                  setCompletedSections([
                    ...completedSections,
                    "Tiêu đề tin tuyển dụng",
                  ]);
                }
              }}
            />
          )}
        />
        {errors.title && <Text type="danger">{errors.title.message}</Text>}
      </StyledCard>

      <StyledCard ref={sectionRefs.industry}>
        <StyledTitle level={3}>Ngành nghề và lĩnh vực</StyledTitle>
        <Controller
          name="industry"
          control={control}
          rules={{ required: "Vui lòng chọn ngành nghề" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Chọn ngành nghề"
              size="large"
              style={{ width: "100%", marginBottom: 16 }}
              onChange={(value) => {
                field.onChange(value);
                if (
                  value &&
                  !completedSections.includes("Ngành nghề và lĩnh vực")
                ) {
                  setCompletedSections([
                    ...completedSections,
                    "Ngành nghề và lĩnh vực",
                  ]);
                }
              }}
            >
              <Option value="Công nghệ thông tin">Công nghệ thông tin</Option>
              <Option value="Marketing">Marketing</Option>
              <Option value="Kinh doanh">Kinh doanh</Option>
            </Select>
          )}
        />
        {errors.industry && (
          <Text type="danger">{errors.industry.message}</Text>
        )}
        <Controller
          name="position"
          control={control}
          defaultValue={null}
          rules={{ required: "Vui lòng chọn vị trí tuyển dụng" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Chọn vị trí tuyển dụng"
              size="large"
              style={{ width: "100%" }}
              onChange={(value) => {
                field.onChange(value);
                if (
                  value &&
                  !completedSections.includes("Ngành nghề và lĩnh vực")
                ) {
                  setCompletedSections([
                    ...completedSections,
                    "Ngành nghề và lĩnh vực",
                  ]);
                }
              }}
            >
              <Option value="Frontend Developer">Frontend Developer</Option>
              <Option value="Backend Developer">Backend Developer</Option>
              <Option value="Product Manager">Product Manager</Option>
            </Select>
          )}
        />
        {errors.position && (
          <Text type="danger">{errors.position.message}</Text>
        )}
      </StyledCard>

      <StyledCard ref={sectionRefs.generalInfo}>
        <StyledTitle level={3}>Thông tin chung</StyledTitle>
        <Controller
          name="jobType"
          control={control}
          rules={{ required: "Vui lòng chọn loại công việc" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Chọn loại công việc"
              size="large"
              style={{ width: "100%", marginBottom: 16 }}
              onChange={(value) => {
                field.onChange(value);
                if (value && !completedSections.includes("Thông tin chung")) {
                  setCompletedSections([
                    ...completedSections,
                    "Thông tin chung",
                  ]);
                }
              }}
            >
              <Option value="Full-time">Full-time</Option>
              <Option value="Part-time">Part-time</Option>
              <Option value="Remote">Remote</Option>
            </Select>
          )}
        />
        {errors.jobType && <Text type="danger">{errors.jobType.message}</Text>}
        <Controller
          name="level"
          control={control}
          rules={{ required: "Vui lòng chọn cấp bậc" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Chọn cấp bậc"
              size="large"
              style={{ width: "100%", marginBottom: 16 }}
              onChange={(value) => {
                field.onChange(value);
                if (value && !completedSections.includes("Thông tin chung")) {
                  setCompletedSections([
                    ...completedSections,
                    "Thông tin chung",
                  ]);
                }
              }}
            >
              <Option value="Nhân viên">Nhân viên</Option>
              <Option value="Trưởng nhóm">Trưởng nhóm</Option>
              <Option value="Quản lý">Quản lý</Option>
            </Select>
          )}
        />
        {errors.level && <Text type="danger">{errors.level.message}</Text>}
        <Controller
          name="experience"
          control={control}
          rules={{ required: "Vui lòng chọn kinh nghiệm" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Chọn kinh nghiệm"
              size="large"
              style={{ width: "100%", marginBottom: 16 }}
              onChange={(value) => {
                field.onChange(value);
                if (value && !completedSections.includes("Thông tin chung")) {
                  setCompletedSections([
                    ...completedSections,
                    "Thông tin chung",
                  ]);
                }
              }}
            >
              <Option value="Không yêu cầu">Không yêu cầu</Option>
              <Option value="1-2 năm">1-2 năm</Option>
              <Option value="3-5 năm">3-5 năm</Option>
            </Select>
          )}
        />
        {errors.experience && (
          <Text type="danger">{errors.experience.message}</Text>
        )}
        <Controller
          name="salaryType"
          control={control}
          rules={{ required: "Vui lòng chọn kiểu lương" }}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Chọn kiểu lương"
              size="large"
              style={{ width: "100%", marginBottom: 16 }}
              onChange={(value) => {
                field.onChange(value);
                if (value && !completedSections.includes("Thông tin chung")) {
                  setCompletedSections([
                    ...completedSections,
                    "Thông tin chung",
                  ]);
                }
              }}
            >
              <Option value="Thỏa thuận">Thỏa thuận</Option>
              <Option value="Khoảng lương">Khoảng lương</Option>
            </Select>
          )}
        />
        {errors.salaryType && (
          <Text type="danger">{errors.salaryType.message}</Text>
        )}
        {salaryType === "Khoảng lương" && (
          <SalaryRange>
            <Controller
              name="salaryRange.min"
              control={control}
              rules={{ required: "Vui lòng nhập lương tối thiểu" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Lương tối thiểu (triệu)"
                  size="large"
                  style={{ width: "48%", marginRight: "4%" }}
                  onChange={(e) => {
                    field.onChange(e);
                    if (
                      e.target.value &&
                      !completedSections.includes("Thông tin chung")
                    ) {
                      setCompletedSections([
                        ...completedSections,
                        "Thông tin chung",
                      ]);
                    }
                  }}
                />
              )}
            />
            {errors.salaryRange?.min && (
              <Text type="danger">{errors.salaryRange.min.message}</Text>
            )}
            <Controller
              name="salaryRange.max"
              control={control}
              rules={{ required: "Vui lòng nhập lương tối đa" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Lương tối đa (triệu)"
                  size="large"
                  style={{ width: "48%" }}
                  onChange={(e) => {
                    field.onChange(e);
                    if (
                      e.target.value &&
                      !completedSections.includes("Thông tin chung")
                    ) {
                      setCompletedSections([
                        ...completedSections,
                        "Thông tin chung",
                      ]);
                    }
                  }}
                />
              )}
            />
            {errors.salaryRange?.max && (
              <Text type="danger">{errors.salaryRange.max.message}</Text>
            )}
          </SalaryRange>
        )}
        {locations.map((location, index) => (
          <LocationItem key={index}>
            <Select
              placeholder="Chọn tỉnh/thành phố"
              value={location.city}
              onChange={(value) => handleLocationChange(index, "city", value)}
              size="large"
              style={{ width: "100%", marginBottom: 16 }}
            >
              <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
            </Select>
            <Input
              placeholder="Địa chỉ cụ thể"
              value={location.address}
              onChange={(e) =>
                handleLocationChange(index, "address", e.target.value)
              }
              size="large"
              style={{ marginBottom: 16 }}
            />
          </LocationItem>
        ))}
        <Button type="primary" icon={<PlusOutlined />} onClick={addLocation}>
          Thêm khu vực
        </Button>
      </StyledCard>

      <EditorSection
        title="Nội dung tuyển dụng chi tiết"
        editor={descriptionEditor}
        renderToolbar={() => <EditorToolbar editor={descriptionEditor} />}
      />
      {errors.description && (
        <Text type="danger">{errors.description.message}</Text>
      )}

      <StyledCard ref={sectionRefs.requirements}>
        <StyledTitle level={3}>Yêu cầu ứng viên</StyledTitle>
        <EditorToolbar editor={requirementsEditor} />
        <EditorSection
          title=""
          editor={requirementsEditor}
          renderToolbar={() => null}
        />
        <Controller
          name="skills"
          control={control}
          rules={{ required: "Vui lòng chọn ít nhất một kỹ năng" }}
          render={({ field }) => (
            <Select
              {...field}
              mode="tags"
              placeholder="Chọn kỹ năng liên quan"
              size="large"
              style={{ width: "100%", marginTop: 16 }}
              onChange={(value) => {
                field.onChange(value);
                if (
                  value.length > 0 &&
                  !completedSections.includes("Yêu cầu ứng viên")
                ) {
                  setCompletedSections([
                    ...completedSections,
                    "Yêu cầu ứng viên",
                  ]);
                }
              }}
            >
              <Option value="React">React</Option>
              <Option value="Node.js">Node.js</Option>
              <Option value="Python">Python</Option>
            </Select>
          )}
        />
        {errors.skills && <Text type="danger">{errors.skills.message}</Text>}
      </StyledCard>

      <EditorSection
        title="Quyền lợi ứng viên"
        editor={benefitsEditor}
        renderToolbar={() => <EditorToolbar editor={benefitsEditor} />}
      />
      {errors.benefits && <Text type="danger">{errors.benefits.message}</Text>}

      <StyledCard ref={sectionRefs.cvInfo}>
        <StyledTitle level={3}>Thông tin nhận CV</StyledTitle>
        <Controller
          name="deadline"
          control={control}
          rules={{ required: "Vui lòng nhập hạn chót nhận hồ sơ" }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Hạn chót nhận hồ sơ (dd/mm/yyyy)"
              size="large"
              onChange={(e) => {
                field.onChange(e);
                if (
                  e.target.value &&
                  !completedSections.includes("Thông tin nhận CV")
                ) {
                  setCompletedSections([
                    ...completedSections,
                    "Thông tin nhận CV",
                  ]);
                }
              }}
            />
          )}
        />
        {errors.deadline && (
          <Text type="danger">{errors.deadline.message}</Text>
        )}
      </StyledCard>
    </form>
  );
};

export default PostJobForm;
