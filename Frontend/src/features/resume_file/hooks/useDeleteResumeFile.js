import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResumeFileApi } from "../services/Resume_FileApi";

const useDeleteResumeFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteResumeFileApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["resumeFiles"]);
    },
  });
};

export default useDeleteResumeFile;
