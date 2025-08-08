import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllResumeAnalysisApi } from "../services/ResumeAnalysisApi";

const useDeleteAllResumeAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllResumeAnalysisApi(),
    onSuccess: () => {
      // Làm mới các truy vấn liên quan đến resume analysis
      queryClient.invalidateQueries({ queryKey: ["resume-analysis"] });
    },
  });
};

export default useDeleteAllResumeAnalysis;
