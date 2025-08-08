import { useQuery } from "@tanstack/react-query";
import { getListResumeAnalysisByCandidateIdApi } from "../services/ResumeAnalysisApi";

const useGetListResumeAnalysisByCandidateId = (candidate_id) => {
  return useQuery({
    queryKey: ["resumeAnalysesByCandidate", candidate_id],
    queryFn: () => getListResumeAnalysisByCandidateIdApi(candidate_id),
    enabled: !!candidate_id, // Chỉ gọi khi có candidate_id
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetListResumeAnalysisByCandidateId;
