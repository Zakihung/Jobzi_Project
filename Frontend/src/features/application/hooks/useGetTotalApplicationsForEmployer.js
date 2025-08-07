import { useQuery } from "@tanstack/react-query";
import { getTotalApplicationsForEmployerApi } from "../services/applicationApi";

const useGetTotalApplicationsForEmployer = (employer_id) => {
  return useQuery({
    queryKey: ["totalApplicationsForEmployer", employer_id],
    queryFn: () => getTotalApplicationsForEmployerApi(employer_id),
    enabled: !!employer_id,
  });
};

export default useGetTotalApplicationsForEmployer;
