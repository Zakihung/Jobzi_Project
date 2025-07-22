import { useQuery } from "@tanstack/react-query";
import { getApplicationsByCandidateIdApi } from "../services/applicationApi";

const useGetApplicationsByCandidateId = (candidate_id) => {
  return useQuery({
    queryKey: ["applicationsByCandidate", candidate_id],
    queryFn: () => getApplicationsByCandidateIdApi(candidate_id),
    enabled: !!candidate_id, // Chỉ chạy query nếu candidate_id tồn tại
  });
};

export default useGetApplicationsByCandidateId;
