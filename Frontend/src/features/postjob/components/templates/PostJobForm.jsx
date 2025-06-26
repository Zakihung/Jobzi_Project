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
import { useContext } from "react";
import { AuthContext } from "../../../../contexts/auth.context";
import { formatDateToISO } from "../../../../constants/formatDateToISO";
import useGetEmployerByUserId from "../../../employer/hooks/useGetEmployerByUserId";

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
  const { message } = App.useApp();
  const salary_type = watch("salary_type");
  const { auth } = useContext(AuthContext);
  const { data: employer } = useGetEmployerByUserId(auth?.user?.id);
  const { mutate } = useCreateJobPost();

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

    if (auth?.user?.role !== "employer") {
      message.error("Lỗi id");
      return;
    }
    const employer_id = employer?.data?._id;

    if (
      isValid &&
      completedSections.length === allSections.length &&
      locations.every((loc) => loc.province && loc.address)
    ) {
      // Gán lại dữ liệu theo schema của backend
      const jobPostingData = {
        employer_id: employer_id, // Giả định employer_id, cần thay bằng giá trị thực tế (ví dụ: từ context hoặc auth)
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
        status: "active",
        skills: data.skills.map((skill) => skill.value || skill), // Chuyển skills thành mảng chuỗi
        locations: locations.map((loc) => ({
          address: loc.address,
          province: loc.province,
        })),
      };

      // Console.log dữ liệu trước khi gửi
      console.log("Dữ liệu gửi đến backend MongoDB:", jobPostingData);

      // Gửi dữ liệu bằng useCreateJobPost
      mutate(jobPostingData, {
        onSuccess: () => {
          message.success("Đăng tin tuyển dụng thành công!");
          console.log("Đăng tin thành công");
        },
        onError: (error) => {
          message.error(
            `Lỗi khi đăng tin: ${
              error.response?.data?.message || error.message
            }`
          );
          console.error("Lỗi khi gửi dữ liệu:", error);
        },
      });
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
        setValue={setValue}
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
