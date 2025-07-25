import { useQuery } from "@tanstack/react-query";
import { getListResumeAnalysisApi } from "../services/ResumeAnalysisApi";

const useGetListResumeAnalysis = () => {
  return useQuery({
    queryKey: ["resumeAnalyses"],
    queryFn: () => getListResumeAnalysisApi(),
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetListResumeAnalysis;
