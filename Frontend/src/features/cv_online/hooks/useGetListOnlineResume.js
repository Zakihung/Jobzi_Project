import { useQuery } from "@tanstack/react-query";
import { getListOnlineResumeApi } from "../services/Online_ResumeApi";

const useGetListOnlineResume = () => {
  return useQuery({
    queryKey: ["onlineResumes"],
    queryFn: getListOnlineResumeApi,
  });
};

export default useGetListOnlineResume;
