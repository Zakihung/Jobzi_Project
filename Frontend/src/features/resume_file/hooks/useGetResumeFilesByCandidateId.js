import { useQuery } from "@tanstack/react-query";
import { getResumeFilesByCandidateIdApi } from "../services/Resume_FileApi";

const useGetResumeFilesByCandidateId = (candidateId) => {
  return useQuery({
    queryKey: ["resumeFiles", candidateId],
    queryFn: () => getResumeFilesByCandidateIdApi(candidateId),
    enabled: !!candidateId, // Chỉ chạy khi candidateId tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetResumeFilesByCandidateId;
