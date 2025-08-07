import { useQuery } from "@tanstack/react-query";
import { getFilteredJobPostsApi } from "../../services/Job_PostApi";

const useGetFilteredJobPosts = () => {
  return useQuery({
    queryKey: ["filteredJobPosts"],
    queryFn: getFilteredJobPostsApi,
  });
};

export default useGetFilteredJobPosts;
