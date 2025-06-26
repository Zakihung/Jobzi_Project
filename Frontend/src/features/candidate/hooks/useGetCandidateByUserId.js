import { useQuery } from "@tanstack/react-query";
import { getCandidateByUserIdApi } from "../services/CandidateApi";

const useGetCandidateByUserId = (userId) => {
  return useQuery({
    queryKey: ["candidate", userId],
    queryFn: () => getCandidateByUserIdApi(userId),
    enabled: !!userId, // Chỉ chạy query khi userId tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetCandidateByUserId;
