import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAvatarUser } from "../services/userApi";

const useUploadAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ user_id, file }) => uploadAvatarUser(user_id, file),
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};

export default useUploadAvatar;
