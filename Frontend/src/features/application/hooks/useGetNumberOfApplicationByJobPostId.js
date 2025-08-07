import { useQuery } from "@tanstack/react-query";
import { getNumberOfApplicationByJobPostIdApi } from "../services/applicationApi";

const useGetNumberOfApplicationByJobPostId = (job_post_id) => {
  return useQuery({
    queryKey: ["numberOfApplicationsByJobPost", job_post_id],
    queryFn: () => getNumberOfApplicationByJobPostIdApi(job_post_id),
    enabled: !!job_post_id, // Chỉ gọi API nếu job_post_id tồn tại
  });
};

export default useGetNumberOfApplicationByJobPostId;
