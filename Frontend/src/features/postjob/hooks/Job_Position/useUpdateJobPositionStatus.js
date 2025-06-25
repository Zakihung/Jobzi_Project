import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobPositionStatusApi } from "../../services/JobPositionApi";

const useUpdateJobPositionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateJobPositionStatusApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("jobPositions");
      queryClient.invalidateQueries("jobPosition");
    },
  });
};

export default useUpdateJobPositionStatus;
