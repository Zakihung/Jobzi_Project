import { useQuery } from "@tanstack/react-query";
import { getJobPostsByEmployerIdApi } from "../../services/Job_PostApi";

const useGetJobPostsByEmployerId = (employerId) => {
  return useQuery({
    queryKey: ["jobPosts", "employer", employerId],
    queryFn: () => getJobPostsByEmployerIdApi(employerId),
    enabled: !!employerId,
  });
};

export default useGetJobPostsByEmployerId;
