import { useQuery } from "@tanstack/react-query";
import { getLatestResumeAnalysisApi } from "../services/ResumeAnalysisApi";

const useGetLatestResumeAnalysis = (
  job_post_id,
  resume_file_id,
  online_resume_id
) => {
  return useQuery({
    queryKey: [
      "latestResumeAnalysis",
      job_post_id,
      resume_file_id,
      online_resume_id,
    ],
    queryFn: () =>
      getLatestResumeAnalysisApi(job_post_id, resume_file_id, online_resume_id),
    enabled:
      !!job_post_id &&
      (!resume_file_id || !!resume_file_id) &&
      (!online_resume_id || !!online_resume_id),
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetLatestResumeAnalysis;
