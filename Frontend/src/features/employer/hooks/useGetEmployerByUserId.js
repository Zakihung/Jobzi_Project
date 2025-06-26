import { useQuery } from "@tanstack/react-query";
import { getEmployerByUserIdApi } from "../services/EmployerApi";

const useGetEmployerByUserId = (userId) => {
  return useQuery({
    queryKey: ["employer", userId],
    queryFn: () => getEmployerByUserIdApi(userId),
    enabled: !!userId, // Chỉ chạy query khi userId tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetEmployerByUserId;
