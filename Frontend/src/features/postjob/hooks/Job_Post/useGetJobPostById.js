import { useQuery } from "@tanstack/react-query";
import { getJobPostByIdApi } from "../../services/Job_PostApi";

const useGetJobPostById = (id) => {
  return useQuery({
    queryKey: ["jobPost", id],
    queryFn: () => getJobPostByIdApi(id),
    enabled: !!id,
  });
};

export default useGetJobPostById;
