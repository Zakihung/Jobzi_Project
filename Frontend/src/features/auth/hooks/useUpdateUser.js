import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../services/userApi";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user_id, data }) => updateUser(user_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useUpdateUser;
