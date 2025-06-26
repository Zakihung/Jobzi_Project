import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployerApi } from "../services/EmployerApi";

const useDeleteEmployer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteEmployerApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["employer"]);
      queryClient.invalidateQueries(["employers"]);
    },
  });
};

export default useDeleteEmployer;
