import { useQuery } from "@tanstack/react-query";
import { getAllResumeFilesApi } from "../services/Resume_FileApi";

const useGetAllResumeFiles = () => {
  return useQuery({
    queryKey: ["resumeFiles"],
    queryFn: getAllResumeFilesApi,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetAllResumeFiles;
