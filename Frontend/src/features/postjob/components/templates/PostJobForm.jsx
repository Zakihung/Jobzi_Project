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
      />
      <BenefitsSection
        editor={benefitsEditor}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
      />
      <CvInfoSection
        control={control}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
      />
    </form>
  );
};

export default PostJobForm;
