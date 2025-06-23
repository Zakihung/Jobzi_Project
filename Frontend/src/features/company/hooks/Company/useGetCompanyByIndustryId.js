import { useQuery } from "@tanstack/react-query";
import { getCompanyByIndustryIdApi } from "../../services/CompanyApi";

const useGetCompanyByIndustryId = (company_industry_id) => {
  return useQuery({
    queryKey: ["companies", company_industry_id],
    queryFn: () => getCompanyByIndustryIdApi(company_industry_id),
    enabled: !!company_industry_id,
  });
};

export default useGetCompanyByIndustryId;
