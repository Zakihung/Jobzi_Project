import { useForm } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { message } from "antd";
import JobTitleSection from "../organisms/JobTitleSection";
import IndustrySection from "../organisms/IndustrySection";
import GeneralInfoSection from "../organisms/GeneralInfoSection";
import DescriptionSection from "../organisms/DescriptionSection";
import RequirementsSection from "../organisms/RequirementsSection";
import BenefitsSection from "../organisms/BenefitsSection";
import CvInfoSection from "../organisms/CvInfoSection";

const PostJobForm = ({
  sectionRefs,
  locations,
  handleLocationChange,
  addLocation,
  removeLocation,
  completedSections,
  setCompletedSections,
  allSections,
  formRef, // Nhận formRef từ prop
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
      position: null,
      number: 1,
      work_type: null,
      gender: null,
      experience_level: null,
      role_organization: null,
      min_years_experience: 0,
      salary_type: null,
      min_salary_range: null,
      max_salary_range: null,
      education_level: null,
      description: "",
      requirements: "",
      benefits: "",
      expiredAt: "",
      recipient_name: "",
      recipient_phone_number: "",
      recipient_email: "",
      skills: [],
    },
  });

  const salary_type = watch("salary_type");

  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }),
      Underline,
    ],
    content: "",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setValue("description", content);
      const sectionName = "Nội dung tuyển dụng chi tiết";
      if (editor.getText().length > 0) {
        if (!completedSections.includes(sectionName)) {
          setCompletedSections([...completedSections, sectionName]);
        }
      } else {
        if (completedSections.includes(sectionName)) {
          setCompletedSections(
            completedSections.filter((section) => section !== sectionName)
          );
        }
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
      const content = editor.getHTML();
      setValue("requirements", content);
      const sectionName = "Yêu cầu ứng viên";
      const skills = watch("skills") || [];
      const educationLevel = watch("education_level") || "";
      if (
        editor.getText().length > 0 &&
        skills.length > 0 &&
        educationLevel !== ""
      ) {
        if (!completedSections.includes(sectionName)) {
          setCompletedSections([...completedSections, sectionName]);
        }
      } else {
        if (completedSections.includes(sectionName)) {
          setCompletedSections(
            completedSections.filter((section) => section !== sectionName)
          );
        }
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
      const content = editor.getHTML();
      setValue("benefits", content);
      const sectionName = "Quyền lợi ứng viên";
      if (editor.getText().length > 0) {
        if (!completedSections.includes(sectionName)) {
          setCompletedSections([...completedSections, sectionName]);
        }
      } else {
        if (completedSections.includes(sectionName)) {
          setCompletedSections(
            completedSections.filter((section) => section !== sectionName)
          );
        }
      }
    },
  });

  const onSubmit = async (data) => {
    const isValid = await trigger();

    // Kiểm tra lại trạng thái description, requirements, và benefits
    const descriptionSectionName = "Nội dung tuyển dụng chi tiết";
    if (!data.description || data.description === "<p></p>") {
      if (completedSections.includes(descriptionSectionName)) {
        setCompletedSections(
          completedSections.filter(
            (section) => section !== descriptionSectionName
          )
        );
      }
    } else {
      if (!completedSections.includes(descriptionSectionName)) {
        setCompletedSections([...completedSections, descriptionSectionName]);
      }
    }

    const requirementsSectionName = "Yêu cầu ứng viên";
    if (
      !data.requirements ||
      data.requirements === "<p></p>" ||
      !data.skills ||
      data.skills.length === 0
    ) {
      if (completedSections.includes(requirementsSectionName)) {
        setCompletedSections(
          completedSections.filter(
            (section) => section !== requirementsSectionName
          )
        );
      }
    } else {
      if (!completedSections.includes(requirementsSectionName)) {
        setCompletedSections([...completedSections, requirementsSectionName]);
      }
    }

    const benefitsSectionName = "Quyền lợi ứng viên";
    if (!data.benefits || data.benefits === "<p></p>") {
      if (completedSections.includes(benefitsSectionName)) {
        setCompletedSections(
          completedSections.filter((section) => section !== benefitsSectionName)
        );
      }
    } else {
      if (!completedSections.includes(benefitsSectionName)) {
        setCompletedSections([...completedSections, benefitsSectionName]);
      }
    }

    if (
      isValid &&
      completedSections.length === allSections.length &&
      locations.every((loc) => loc.province && loc.address)
    ) {
      const jobPostingData = {
        ...data,
        locations,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      console.log("Dữ liệu gửi đến backend MongoDB:", jobPostingData);
      message.success("Đăng tin thành công");
    } else {
      message.warning("Vui lòng hoàn thành tất cả các mục trước khi đăng!");
      console.log("Vui lòng hoàn thành tất cả các mục trước khi đăng!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <JobTitleSection
        control={control}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
      />
      <IndustrySection
        control={control}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setValue={setValue}
        setCompletedSections={setCompletedSections}
      />
      <GeneralInfoSection
        control={control}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
        locations={locations}
        handleLocationChange={handleLocationChange}
        addLocation={addLocation}
        removeLocation={removeLocation}
        salary_type={salary_type}
        watch={watch}
      />
      <DescriptionSection
        editor={descriptionEditor}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
      />
      <RequirementsSection
        control={control}
        editor={requirementsEditor}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
        watch={watch}
      />
      <BenefitsSection
        editor={benefitsEditor}
        errors={errors}
        sectionRefs={sectionRefs}
      />
      <CvInfoSection
        control={control}
        errors={errors}
        watch={watch}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
      />
    </form>
  );
};

export default PostJobForm;
