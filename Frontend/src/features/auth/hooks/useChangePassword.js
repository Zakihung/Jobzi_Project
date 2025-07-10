import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePasswordUser } from "../services/userApi";

const useChangePassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => changePasswordUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useChangePassword;
