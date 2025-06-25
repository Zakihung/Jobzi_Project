import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobPostApi } from "../../services/Job_PostApi";

const useCreateJobPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJobPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries("jobPosts");
    },
  });
};

export default useCreateJobPost;
