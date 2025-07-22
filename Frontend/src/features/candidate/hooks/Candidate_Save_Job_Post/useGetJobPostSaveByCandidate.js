import { useQuery } from "@tanstack/react-query";
import { getJobPostSaveByCandidateApi } from "../../services/Candidate_Save_Job_PostApi";

const useGetJobPostSaveByCandidate = (candidate_id) => {
  return useQuery({
    queryKey: ["jobPostSaveByCandidate", candidate_id],
    queryFn: () => getJobPostSaveByCandidateApi(candidate_id),
    enabled: !!candidate_id, // Chỉ chạy query nếu candidate_id tồn tại
  });
};

export default useGetJobPostSaveByCandidate;
