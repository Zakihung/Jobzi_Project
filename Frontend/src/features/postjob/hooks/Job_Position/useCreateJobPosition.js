import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJobPositionApi } from "../../services/Job_PositionApi";

const useCreateJobPosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJobPositionApi,
    onSuccess: () => {
      queryClient.invalidateQueries("jobPositions");
    },
  });
};

export default useCreateJobPosition;
