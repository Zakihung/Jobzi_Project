import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { processResumeAnalysisByOnlineApi } from "../services/ResumeAnalysisApi";

const useProcessResumeAnalysisByOnline = () => {
  const { message } = App.useApp();
  return useMutation({
    mutationFn: ({ online_resume_id, data }) =>
      processResumeAnalysisByOnlineApi(online_resume_id, data),
    onMutate: () => {
      message.loading({
        content: "Đang xử lý phân tích CV trực tuyến...",
        key: "processOnline",
        duration: 0,
      });
    },
    onSuccess: () => {
      message.success({
        content: "Phân tích CV trực tuyến thành công!",
        key: "processOnline",
      });
    },
    onError: (error) => {
      message.error({
        content:
          error.response?.data?.message || "Phân tích CV trực tuyến thất bại!",
        key: "processOnline",
      });
    },
  });
};

export default useProcessResumeAnalysisByOnline;
