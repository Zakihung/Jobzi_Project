import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserByAdmin } from "../services/userApi";

const useCreateUserByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createUserByAdmin(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useCreateUserByAdmin;
