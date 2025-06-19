import React, { useRef } from "react";
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
      jobType: null,
      gender: null,
      level: null,
      experience: null,
      salaryType: null,
      salaryRange: { min: "", max: "" },
      description: "",
      requirements: "",
      benefits: "",
      deadline: "",
      recipient_name: "",
      recipient_phone_number: "",
      recipient_email: "",
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
      if (editor.getText().length > 0 && skills.length > 0) {
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

  const formRef = useRef(null);

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
      locations.every((loc) => loc.city && loc.address)
    ) {
      message.success("Đăng tin thành công");
      console.log("Đăng tin thành công");
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
        salaryType={salaryType}
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
