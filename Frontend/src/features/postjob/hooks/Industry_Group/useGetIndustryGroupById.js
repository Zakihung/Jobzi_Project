import { useQuery } from "@tanstack/react-query";
import { getIndustryGroupByIdApi } from "../../services/IndustryGroupApi";

const useGetIndustryGroupById = (id) => {
  return useQuery({
    queryKey: ["industryGroup", id],
    queryFn: () => getIndustryGroupByIdApi(id),
    enabled: !!id, // Chỉ chạy query khi id tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetIndustryGroupById;
