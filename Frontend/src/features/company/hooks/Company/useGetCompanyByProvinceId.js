import { useQuery } from "@tanstack/react-query";
import { getCompanyByProvinceIdApi } from "../../services/CompanyApi";

const useGetCompanyByProvinceId = (province_id) => {
  return useQuery({
    queryKey: ["companies", province_id],
    queryFn: () => getCompanyByProvinceIdApi(province_id),
    enabled: !!province_id,
  });
};

export default useGetCompanyByProvinceId;
