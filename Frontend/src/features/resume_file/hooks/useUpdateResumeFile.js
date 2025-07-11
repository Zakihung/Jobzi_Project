import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResumeFileApi } from "../services/Resume_FileApi";

const useUpdateResumeFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data, file }) => updateResumeFileApi(id, data, file),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["resumeFiles"]);
      queryClient.invalidateQueries(["resumeFile", variables.id]);
    },
  });
};

export default useUpdateResumeFile;
