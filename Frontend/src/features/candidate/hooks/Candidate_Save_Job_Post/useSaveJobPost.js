import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveJobPostApi } from "../../services/Candidate_Save_Job_PostApi";

const useSaveJobPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: saveJobPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries("candidateSaveJobPosts"); // Làm mới danh sách bài đăng công việc đã lưu
    },
  });
};

export default useSaveJobPost;
