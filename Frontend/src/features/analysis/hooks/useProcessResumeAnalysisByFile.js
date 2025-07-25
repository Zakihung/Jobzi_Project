import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { processResumeAnalysisByFileApi } from "../services/ResumeAnalysisApi";

const useProcessResumeAnalysisByFile = () => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: ({ resume_file_id, data }) =>
      processResumeAnalysisByFileApi(resume_file_id, data),
    onMutate: () => {
      message.loading({
        content: "Đang xử lý phân tích CV từ file...",
        key: "processFile",
        duration: 0,
      });
    },
    onSuccess: () => {
      message.success({
        content: "Phân tích CV từ file thành công!",
        key: "processFile",
      });
    },
    onError: (error) => {
      message.error({
        content:
          error.response?.data?.message || "Phân tích CV từ file thất bại!",
        key: "processFile",
      });
    },
  });
};

export default useProcessResumeAnalysisByFile;
