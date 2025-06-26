import { useQuery } from "@tanstack/react-query";
import { getListCandidateApi } from "../services/CandidateApi";

const useGetListCandidate = () => {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: () => getListCandidateApi(),
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetListCandidate;
