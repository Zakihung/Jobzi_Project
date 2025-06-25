import { useQuery } from "@tanstack/react-query";
import { getListIndustryApi } from "../../services/IndustryApi";

const useGetIndustries = () => {
  return useQuery({
    queryKey: ["industries"],
    queryFn: getListIndustryApi,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetIndustries;
