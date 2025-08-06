import { useForm } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { App } from "antd";
import JobTitleSection from "../organisms/JobTitleSection";
import IndustrySection from "../organisms/IndustrySection";
import GeneralInfoSection from "../organisms/GeneralInfoSection";
import DescriptionSection from "../organisms/DescriptionSection";
import RequirementsSection from "../organisms/RequirementsSection";
import BenefitsSection from "../organisms/BenefitsSection";
import CvInfoSection from "../organisms/CvInfoSection";
import useCreateJobPost from "../../hooks/Job_Post/useCreateJobPost";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../../contexts/auth.context";
import {
  formatDateToISO,
  formatISOToDate,
} from "../../../../constants/formatDateToISO";
import useGetEmployerByUserId from "../../../employer/hooks/useGetEmployerByUserId";
import { useNavigate } from "react-router-dom";

const PostJobForm = ({
  sectionRefs,
  locations,
  handleLocationChange,
  addLocation,
  removeLocation,
  completedSections,
  setCompletedSections,
  allSections,
  formRef,
  jobData,
  isEditing,
  disabled,
  updateJobPost,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
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
  const navigate = useNavigate();
  const { message } = App.useApp();
  const salary_type = watch("salary_type");
  const { auth } = useContext(AuthContext);
  const { data: employer } = useGetEmployerByUserId(auth?.user?.id);
  const { mutate: createJobPost } = useCreateJobPost();

  const descriptionEditor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList: true, orderedList: true }),
      Underline,
    ],
    content: jobData?.description || "",
    editable: !disabled,
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
    content: jobData?.requirements || "",
    editable: !disabled,
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
    content: jobData?.benefits || "",
    editable: !disabled,
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

  // Cập nhật trạng thái editable của editor khi disabled thay đổi
  useEffect(() => {
    if (descriptionEditor) {
      descriptionEditor.setOptions({ editable: !disabled });
    }
    if (requirementsEditor) {
      requirementsEditor.setOptions({ editable: !disabled });
    }
    if (benefitsEditor) {
      benefitsEditor.setOptions({ editable: !disabled });
    }
  }, [disabled, descriptionEditor, requirementsEditor, benefitsEditor]);

  useEffect(() => {
    if (jobData) {
      reset({
        title: jobData.title || "",
        position: jobData.job_position_id || null,
        number: jobData.number || 1,
        work_type: jobData.work_type || null,
        gender: jobData.gender || null,
        experience_level: jobData.experience_level || null,
        role_organization: jobData.role_organization || null,
        min_years_experience: jobData.min_years_experience || 0,
        salary_type: jobData.salary_type || null,
        min_salary_range: jobData.min_salary_range || null,
        max_salary_range: jobData.max_salary_range || null,
        education_level: jobData.education_level || null,
        description: jobData.description || "",
        requirements: jobData.requirements || "",
        benefits: jobData.benefits || "",
        expiredAt: jobData.expired_date
          ? formatISOToDate(jobData.expired_date)
          : "",
        recipient_name: jobData.recipient_name || "",
        recipient_phone_number: jobData.recipient_phone_number || "",
        recipient_email: jobData.recipient_email || "",
        skills: jobData.skills || [],
        locations: jobData.locations || [],
      });
      // Cập nhật nội dung editor
      if (descriptionEditor) {
        descriptionEditor.commands.setContent(jobData.description || "");
      }
      if (requirementsEditor) {
        requirementsEditor.commands.setContent(jobData.requirements || "");
      }
      if (benefitsEditor) {
        benefitsEditor.commands.setContent(jobData.benefits || "");
      }
    }
  }, [jobData, reset, descriptionEditor, requirementsEditor, benefitsEditor]);

  const onSubmit = async (data) => {
    console.log("onSubmit called with data:", data);
    console.log("isEditing:", isEditing);
    console.log("completedSections:", completedSections);
    console.log("locations:", locations);

    if (!isEditing) {
      console.log("Exiting onSubmit because isEditing is false");
      message.warning("Vui lòng bật chế độ chỉnh sửa trước khi đăng!");
      return;
    }

    const isValid = await trigger();
    console.log("Form validation result:", isValid);
    console.log("Errors:", errors);

    const employer_id = employer?.data?._id;
    console.log("employer_id:", employer_id);

    if (
      isValid &&
      completedSections.length === allSections.length &&
      locations.every((loc) => loc.province && loc.address)
    ) {
      const jobPostingData = {
        employer_id: employer_id,
        job_position_id: data.position || null,
        title: data.title,
        gender: data.gender || "",
        description: data.description,
        requirements: data.requirements,
        benefits: data.benefits,
        min_years_experience: data.min_years_experience || 0,
        education_level: data.education_level || "",
        experience_level: data.experience_level || "",
        role_organization: data.role_organization || "",
        work_type: data.work_type || "",
        salary_type: data.salary_type || "negotiable",
        min_salary_range:
          data.salary_type === "negotiable" ? 0 : data.min_salary_range,
        max_salary_range:
          data.salary_type === "negotiable" ? 0 : data.max_salary_range,
        recipient_email: data.recipient_email || "",
        recipient_name: data.recipient_name || "",
        recipient_phone_number: data.recipient_phone_number || "",
        expired_date: formatDateToISO(data.expiredAt) || null,
        status: jobData?.status || "active",
        skills: data.skills.map((skill) => skill.value || skill),
        locations: locations.map((loc) => ({
          address: loc.address,
          province: loc.province,
        })),
      };

      console.log("jobPostingData:", jobPostingData);

      if (jobData?._id) {
        // Chế độ cập nhật
        updateJobPost(
          { id: jobData._id, data: jobPostingData },
          {
            onSuccess: () => {
              message.success("Cập nhật tin tuyển dụng thành công!");
              setTimeout(() => {
                navigate("/employer/jobs");
              }, 2000);
            },
            onError: (error) => {
              console.error(
                "Update error:",
                error.response?.data || error.message
              );
              message.error(
                `Lỗi khi cập nhật tin: ${
                  error.response?.data?.message || error.message
                }`
              );
            },
          }
        );
      } else {
        // Chế độ tạo mới
        createJobPost(jobPostingData, {
          onSuccess: () => {
            message.success("Đăng tin tuyển dụng thành công!");
            setTimeout(() => {
              navigate("/employer/jobs");
            }, 2000);
          },
          onError: (error) => {
            console.error(
              "Create error:",
              error.response?.data || error.message
            );
            message.error(
              `Lỗi khi đăng tin: ${
                error.response?.data?.message || error.message
              }`
            );
          },
        });
      }
    } else {
      const validationErrors = [];
      if (!isValid) {
        validationErrors.push("Một số trường bắt buộc chưa được điền đúng.");
      }
      if (completedSections.length !== allSections.length) {
        validationErrors.push(
          `Chưa hoàn thành tất cả các mục (${completedSections.length}/${allSections.length}).`
        );
      }
      if (!locations.every((loc) => loc.province && loc.address)) {
        validationErrors.push("Địa điểm làm việc chưa được điền đầy đủ.");
      }
      message.error(validationErrors.join(" "));
      console.log("Validation failed:", {
        isValid,
        completedSections,
        locations,
      });
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
        disabled={disabled}
      />
      <IndustrySection
        control={control}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setValue={setValue}
        setCompletedSections={setCompletedSections}
        disabled={disabled}
        jobData={jobData}
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
        setValue={setValue}
        disabled={disabled}
      />
      <DescriptionSection
        editor={descriptionEditor}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
        disabled={disabled}
      />
      <RequirementsSection
        control={control}
        editor={requirementsEditor}
        errors={errors}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
        watch={watch}
        disabled={disabled}
      />
      <BenefitsSection
        editor={benefitsEditor}
        errors={errors}
        sectionRefs={sectionRefs}
        disabled={disabled}
      />
      <CvInfoSection
        control={control}
        errors={errors}
        watch={watch}
        sectionRefs={sectionRefs}
        completedSections={completedSections}
        setCompletedSections={setCompletedSections}
        disabled={disabled}
      />
    </form>
  );
};

export default PostJobForm;
