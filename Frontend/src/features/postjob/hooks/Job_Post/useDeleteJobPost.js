import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobPostApi } from "../../services/Job_PostApi";

const useDeleteJobPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJobPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries("jobPosts");
    },
  });
};

export default useDeleteJobPost;
