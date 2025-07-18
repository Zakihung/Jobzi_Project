import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItemInArrayApi } from "../services/Online_ResumeApi";

const useUpdateItemInArray = (candidate_id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateItemInArrayApi(candidate_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["onlineResume", candidate_id]);
    },
  });
};

export default useUpdateItemInArray;
