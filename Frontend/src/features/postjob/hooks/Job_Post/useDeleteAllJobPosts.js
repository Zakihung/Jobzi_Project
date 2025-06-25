import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllJobPostsApi } from "../../services/Job_PostApi";

const useDeleteAllJobPosts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllJobPostsApi,
    onSuccess: () => {
      queryClient.invalidateQueries("jobPosts");
    },
  });
};

export default useDeleteAllJobPosts;
