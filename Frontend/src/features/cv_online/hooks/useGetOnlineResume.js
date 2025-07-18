import { useQuery } from "@tanstack/react-query";
import { getOnlineResumeApi } from "../services/Online_ResumeApi";

const useGetOnlineResume = (candidate_id) => {
  return useQuery({
    queryKey: ["onlineResume", candidate_id],
    queryFn: () => getOnlineResumeApi(candidate_id),
    enabled: !!candidate_id, // Chỉ chạy query nếu candidate_id tồn tại
  });
};

export default useGetOnlineResume;
