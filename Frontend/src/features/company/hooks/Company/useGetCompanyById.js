import { useQuery } from "@tanstack/react-query";
import { getCompanyByIdApi } from "../../services/CompanyApi";

const useGetCompanyById = (id) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompanyByIdApi(id),
    enabled: !!id,
  });
};

export default useGetCompanyById;
