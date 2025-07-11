import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createResumeFileApi } from "../services/Resume_FileApi";

const useCreateResumeFile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ candidateId, data, file }) =>
      createResumeFileApi(candidateId, data, file),
    onSuccess: () => {
      queryClient.invalidateQueries(["resumeFiles"]);
    },
  });
};

export default useCreateResumeFile;
