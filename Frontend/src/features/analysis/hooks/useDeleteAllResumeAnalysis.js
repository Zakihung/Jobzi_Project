import { useMutation } from "@tanstack/react-query";
import { deleteAllResumeAnalysisApi } from "../services/ResumeAnalysisApi";

const useDeleteAllResumeAnalysis = () => {
  return useMutation({
    mutationFn: () => deleteAllResumeAnalysisApi(),
  });
};

export default useDeleteAllResumeAnalysis;
