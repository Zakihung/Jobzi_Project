import { useQuery } from "@tanstack/react-query";
import { getResumeAnalysisByIdApi } from "../services/ResumeAnalysisApi";

const useGetResumeAnalysisById = (id) => {
  return useQuery({
    queryKey: ["resumeAnalysis", id],
    queryFn: () => getResumeAnalysisByIdApi(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetResumeAnalysisById;
