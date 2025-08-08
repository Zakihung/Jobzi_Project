import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResumeAnalysisApi } from "../services/ResumeAnalysisApi";

const useCreateResumeAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createResumeAnalysisApi(data),
    onSuccess: () => {
      // Làm mới các truy vấn liên quan đến resume analysis
      queryClient.invalidateQueries({ queryKey: ["resume-analysis"] });
    },
  });
};

export default useCreateResumeAnalysis;
