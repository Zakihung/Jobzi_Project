import { useMutation } from "@tanstack/react-query";
import { createResumeAnalysisApi } from "../services/ResumeAnalysisApi";

const useCreateResumeAnalysis = () => {
  return useMutation({
    mutationFn: (data) => createResumeAnalysisApi(data),
  });
};

export default useCreateResumeAnalysis;
