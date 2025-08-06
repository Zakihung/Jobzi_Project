import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusJobPostApi } from "../../services/Job_PostApi";

const useUpdateStatusJobPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateStatusJobPostApi(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries("jobPosts");
    },
  });
};

export default useUpdateStatusJobPost;
