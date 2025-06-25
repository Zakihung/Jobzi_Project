import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteJobPositionApi } from "../../services/JobPositionApi";

const useDeleteJobPosition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteJobPositionApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries("jobPositions");
    },
  });
};

export default useDeleteJobPosition;
