import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOnlineResumeApi } from "../services/Online_ResumeApi";

const useCreateOnlineResume = (candidate_id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createOnlineResumeApi(candidate_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["onlineResume", candidate_id]);
    },
  });
};

export default useCreateOnlineResume;
