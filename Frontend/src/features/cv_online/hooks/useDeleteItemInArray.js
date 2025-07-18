import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItemInArrayApi } from "../services/Online_ResumeApi";

const useDeleteItemInArray = (candidate_id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteItemInArrayApi(candidate_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["onlineResume", candidate_id]);
    },
  });
};

export default useDeleteItemInArray;
