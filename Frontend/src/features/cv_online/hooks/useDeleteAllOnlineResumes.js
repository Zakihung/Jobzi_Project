import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllOnlineResumesApi } from "../services/Online_ResumeApi";

const useDeleteAllOnlineResumes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllOnlineResumesApi,
    onSuccess: () => {
      queryClient.invalidateQueries("onlineResumes");
    },
  });
};

export default useDeleteAllOnlineResumes;
