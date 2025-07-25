import { useQuery } from "@tanstack/react-query";
import { getResumeAnalysisByResumeFileIdApi } from "../services/ResumeAnalysisApi";

const useGetResumeAnalysisByResumeFileId = (resume_file_id) => {
  return useQuery({
    queryKey: ["resumeAnalysisByResumeFile", resume_file_id],
    queryFn: () => getResumeAnalysisByResumeFileIdApi(resume_file_id),
    enabled: !!resume_file_id,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetResumeAnalysisByResumeFileId;
