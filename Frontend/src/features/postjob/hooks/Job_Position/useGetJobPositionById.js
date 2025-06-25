import { useQuery } from "@tanstack/react-query";
import { getJobPositionByIdApi } from "../../services/JobPositionApi";

const useGetJobPositionById = (id) => {
  return useQuery({
    queryKey: ["jobPosition", id],
    queryFn: () => getJobPositionByIdApi(id),
    enabled: !!id, // Chỉ chạy query khi id tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetJobPositionById;
