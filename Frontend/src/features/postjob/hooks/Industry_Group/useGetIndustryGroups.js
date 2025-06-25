import { useQuery } from "@tanstack/react-query";
import { getListIndustryGroupApi } from "../../services/IndustryGroupApi";

const useGetIndustryGroups = () => {
  return useQuery({
    queryKey: ["industryGroups"],
    queryFn: getListIndustryGroupApi,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetIndustryGroups;
