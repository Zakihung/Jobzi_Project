import { useQuery } from "@tanstack/react-query";
import { getApplicationsByJobPostIdApi } from "../services/applicationApi";

const useGetApplicationsByJobPostId = (job_post_id) => {
  return useQuery({
    queryKey: ["applicationsByJobPost", job_post_id],
    queryFn: () => getApplicationsByJobPostIdApi(job_post_id),
    enabled: !!job_post_id, // Chỉ gọi API nếu job_post_id tồn tại
  });
};

export default useGetApplicationsByJobPostId;
