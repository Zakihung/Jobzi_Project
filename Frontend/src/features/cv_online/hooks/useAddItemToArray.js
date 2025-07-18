import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToArrayApi } from "../services/Online_ResumeApi";

const useAddItemToArray = (candidate_id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addItemToArrayApi(candidate_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["onlineResume", candidate_id]);
    },
  });
};

export default useAddItemToArray;
