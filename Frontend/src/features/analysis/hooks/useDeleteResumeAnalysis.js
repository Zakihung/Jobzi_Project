import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResumeAnalysisApi } from "../services/ResumeAnalysisApi";

const useDeleteResumeAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteResumeAnalysisApi(id),
    onSuccess: () => {
      // Làm mới các truy vấn liên quan đến resume analysis
      queryClient.invalidateQueries({
        queryKey: ["resumeAnalysesByCandidate"],
      });
      queryClient.invalidateQueries({
        queryKey: ["resumeAnalyses"],
      });
    },
  });
};

export default useDeleteResumeAnalysis;
