import { useQuery } from "@tanstack/react-query";
import { getJobPostsByJobPositionIdApi } from "../../services/Job_PostApi";

const useGetJobPostsByJobPositionId = (jobPositionId) => {
  return useQuery({
    queryKey: ["jobPosts", "jobPosition", jobPositionId],
    queryFn: () => getJobPostsByJobPositionIdApi(jobPositionId),
    enabled: !!jobPositionId,
  });
};

export default useGetJobPostsByJobPositionId;
