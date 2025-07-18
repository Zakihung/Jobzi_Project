import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOnlineResumeApi } from "../services/Online_ResumeApi";

const useUpdateOnlineResume = (candidate_id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateOnlineResumeApi(candidate_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["onlineResume", candidate_id]);
    },
  });
};

export default useUpdateOnlineResume;
