import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllJobPositionsApi } from "../../services/JobPositionApi";

const useDeleteAllJobPositions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllJobPositionsApi,
    onSuccess: () => {
      queryClient.invalidateQueries("jobPositions");
    },
  });
};

export default useDeleteAllJobPositions;
