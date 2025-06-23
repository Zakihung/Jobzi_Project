import { useQuery } from "@tanstack/react-query";
import { getListCompanyIndustryApi } from "../../services/Company_IndustryApi";

const useGetListCompanyIndustry = () => {
  return useQuery({
    queryKey: ["companyIndustries"],
    queryFn: getListCompanyIndustryApi,
  });
};

export default useGetListCompanyIndustry;
