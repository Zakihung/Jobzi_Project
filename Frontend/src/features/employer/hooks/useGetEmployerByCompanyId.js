import { useQuery } from "@tanstack/react-query";
import { getEmployerByCompanyIdApi } from "../services/EmployerApi";

const useGetEmployerByCompanyId = (companyId) => {
  return useQuery({
    queryKey: ["employer", companyId],
    queryFn: () => getEmployerByCompanyIdApi(companyId),
    enabled: !!companyId, // Chỉ chạy query khi companyId tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetEmployerByCompanyId;
