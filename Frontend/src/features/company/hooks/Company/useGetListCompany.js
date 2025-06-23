import { useQuery } from "@tanstack/react-query";
import { getListCompanyApi } from "../../services/CompanyApi";

const useGetListCompany = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getListCompanyApi,
  });
};

export default useGetListCompany;
