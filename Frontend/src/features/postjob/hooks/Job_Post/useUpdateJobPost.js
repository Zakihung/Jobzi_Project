import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobPostApi } from "../../services/Job_PostApi";

const useUpdateJobPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateJobPostApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("jobPosts");
    },
  });
};

export default useUpdateJobPost;
