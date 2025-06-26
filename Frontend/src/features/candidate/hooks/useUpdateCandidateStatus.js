import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCandidateStatusApi } from "../services/CandidateApi";

const useUpdateCandidateStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCandidateStatusApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["candidate"]);
    },
  });
};

export default useUpdateCandidateStatus;
