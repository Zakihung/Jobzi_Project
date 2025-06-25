import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobPositionStatusApi } from "../../services/Job_PositionApi";

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
