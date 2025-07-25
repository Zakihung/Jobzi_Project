import { useMutation } from "@tanstack/react-query";
import { deleteResumeAnalysisApi } from "../services/ResumeAnalysisApi";

const useDeleteResumeAnalysis = () => {
  return useMutation({
    mutationFn: (id) => deleteResumeAnalysisApi(id),
  });
};

export default useDeleteResumeAnalysis;
