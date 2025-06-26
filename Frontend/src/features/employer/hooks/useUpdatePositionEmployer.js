import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePositionEmployerApi } from "../services/EmployerApi";

const useUpdatePositionEmployer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePositionEmployerApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["employer"]);
    },
  });
};

export default useUpdatePositionEmployer;
