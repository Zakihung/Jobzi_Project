import { useQuery } from "@tanstack/react-query";
import { getApplicationCountByStatusForEmployerApi } from "../services/applicationApi";

const useGetApplicationCountByStatusForEmployer = (employer_id) => {
  return useQuery({
    queryKey: ["applicationCountByStatus", employer_id],
    queryFn: () => getApplicationCountByStatusForEmployerApi(employer_id),
    enabled: !!employer_id,
  });
};

export default useGetApplicationCountByStatusForEmployer;
