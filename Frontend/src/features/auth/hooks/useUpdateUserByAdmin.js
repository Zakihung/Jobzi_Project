import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserByAdmin } from "../services/userApi";

const useUpdateUserByAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user_id, data }) => updateUserByAdmin(user_id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useUpdateUserByAdmin;
