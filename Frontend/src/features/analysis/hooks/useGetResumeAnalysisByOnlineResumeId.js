import { useQuery } from "@tanstack/react-query";
import { getResumeAnalysisByOnlineResumeIdApi } from "../services/ResumeAnalysisApi";

const useGetResumeAnalysisByOnlineResumeId = (online_resume_id) => {
  return useQuery({
    queryKey: ["resumeAnalysisByOnlineResume", online_resume_id],
    queryFn: () => getResumeAnalysisByOnlineResumeIdApi(online_resume_id),
    enabled: !!online_resume_id,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetResumeAnalysisByOnlineResumeId;
