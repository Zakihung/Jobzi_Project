import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserById } from "../services/userApi";

const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id) => deleteUserById(user_id),
    onSuccess: () => {
      queryClient.invalidateQueries(["userList"]);
    },
  });
};

export default useDeleteUser;
