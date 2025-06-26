import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCandidateApi } from "../services/CandidateApi";

const useDeleteCandidate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCandidateApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["candidate"]);
      queryClient.invalidateQueries(["candidates"]);
    },
  });
};

export default useDeleteCandidate;
