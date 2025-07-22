import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unSaveJobPostApi } from "../../services/Candidate_Save_Job_PostApi";

const useUnSaveJobPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unSaveJobPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries("candidateSaveJobPosts"); // Làm mới danh sách bài đăng công việc đã lưu
    },
  });
};

export default useUnSaveJobPost;
