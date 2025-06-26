import { useQuery } from "@tanstack/react-query";
import { getEmployerByIdApi } from "../services/EmployerApi";

const useGetEmployerById = (id) => {
  return useQuery({
    queryKey: ["employer", id],
    queryFn: () => getEmployerByIdApi(id),
    enabled: !!id, // Chỉ chạy query khi id tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetEmployerById;
