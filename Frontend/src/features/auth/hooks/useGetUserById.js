import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/userApi";

const useGetUserById = (user_id) => {
  return useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUserById(user_id),
    enabled: !!user_id, // chỉ chạy nếu user_id tồn tại
  });
};

export default useGetUserById;
