import { useQuery } from "@tanstack/react-query";
import { getIndustryByIdApi } from "../../services/IndustryApi";

const useGetIndustryById = (id) => {
  return useQuery({
    queryKey: ["industry", id],
    queryFn: () => getIndustryByIdApi(id),
    enabled: !!id, // Chỉ chạy query khi id tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetIndustryById;
