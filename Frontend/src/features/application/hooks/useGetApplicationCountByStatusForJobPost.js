import { useQuery } from "@tanstack/react-query";
import { getApplicationCountByStatusForJobPostApi } from "../services/applicationApi";

const useGetApplicationCountByStatusForJobPost = (job_post_id) => {
  return useQuery({
    queryKey: ["applicationCountByStatusJobPost", job_post_id],
    queryFn: () => getApplicationCountByStatusForJobPostApi(job_post_id),
    enabled: !!job_post_id,
  });
};

export default useGetApplicationCountByStatusForJobPost;
