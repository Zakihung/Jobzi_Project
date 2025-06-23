import { useQuery } from "@tanstack/react-query";
import { getCompanyIndustryByIdApi } from "../../services/Company_IndustryApi";

const useGetCompanyIndustryById = (id) => {
  return useQuery({
    queryKey: ["companyIndustry", id],
    queryFn: () => getCompanyIndustryByIdApi(id),
    enabled: !!id, // Chỉ gọi API khi id tồn tại
  });
};

export default useGetCompanyIndustryById;
