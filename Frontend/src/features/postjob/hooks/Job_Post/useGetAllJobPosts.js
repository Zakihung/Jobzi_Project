import { useQuery } from "@tanstack/react-query";
import { getAllJobPostsApi } from "../../services/Job_PostApi";

const useGetAllJobPosts = () => {
  return useQuery({
    queryKey: ["jobPosts"],
    queryFn: getAllJobPostsApi,
  });
};

export default useGetAllJobPosts;
