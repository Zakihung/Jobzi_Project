import { useQuery } from "@tanstack/react-query";
import { getCandidateByIdApi } from "../services/CandidateApi";

const useGetCandidateById = (id) => {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: () => getCandidateByIdApi(id),
    enabled: !!id, // Chỉ chạy query khi id tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetCandidateById;
