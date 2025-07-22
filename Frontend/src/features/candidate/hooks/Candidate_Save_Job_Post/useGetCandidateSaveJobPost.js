import { useQuery } from "@tanstack/react-query";
import { getCandidateSaveJobPostApi } from "../../services/Candidate_Save_Job_PostApi";

const useGetCandidateSaveJobPost = (id) => {
  return useQuery({
    queryKey: ["candidateSaveJobPost", id],
    queryFn: () => getCandidateSaveJobPostApi(id),
    enabled: !!id, // Chỉ chạy query nếu id tồn tại
  });
};

export default useGetCandidateSaveJobPost;
