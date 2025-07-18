import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOnlineResumeApi } from "../services/Online_ResumeApi";

const useDeleteOnlineResume = (candidate_id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteOnlineResumeApi(candidate_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["onlineResume", candidate_id]);
    },
  });
};

export default useDeleteOnlineResume;
