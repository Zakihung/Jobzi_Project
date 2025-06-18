import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { message } from "antd";
import EditorSection from "../organisms/EditorSection";
import EditorToolbar from "../organisms/EditorToolbar";
import JobTitleSection from "../organisms/JobTitleSection";
import IndustrySection from "../organisms/IndustrySection";
import GeneralInfoSection from "../organisms/GeneralInfoSection";
import RequirementsSection from "../organisms/RequirementsSection";
import CvInfoSection from "../organisms/CvInfoSection";

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
      setCurrentStep(1);
      message.success("Đã hoàn thành bước 1, chuyển sang bước 2!");
    } else {
      message.warning("Vui lòng hoàn thành tất cả các mục trước khi tiếp tục!");
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
        salaryType={salaryType}
      />
      <div>
        <EditorSection
          title="Nội dung tuyển dụng chi tiết"
          editor={descriptionEditor}
          renderToolbar={() => <EditorToolbar editor={descriptionEditor} />}
        />
        {errors.description && (
          <div style={{ color: "red" }}>{errors.description.message}</div>
        )}
      </div>
      <RequirementsSection
        control={control}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
        requirementsEditor={requirementsEditor}
      />
      <EditorSection
        title="Quyền lợi ứng viên"
        editor={benefitsEditor}
        renderToolbar={() => <EditorToolbar editor={benefitsEditor} />}
      />
      {errors.benefits && (
        <div style={{ color: "red" }}>{errors.benefits.message}</div>
      )}
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
