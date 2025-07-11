import { useQuery } from "@tanstack/react-query";
import { getResumeFileByIdApi } from "../services/Resume_FileApi";

const useGetResumeFileById = (id) => {
  return useQuery({
    queryKey: ["resumeFile", id],
    queryFn: () => getResumeFileByIdApi(id),
    enabled: !!id, // Chỉ chạy khi id tồn tại
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetResumeFileById;
