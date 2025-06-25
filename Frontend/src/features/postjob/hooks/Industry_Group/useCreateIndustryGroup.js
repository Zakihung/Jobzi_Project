import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIndustryGroupApi } from "../../services/Industry_GroupApi";

const useCreateIndustryGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIndustryGroupApi,
    onSuccess: () => {
      queryClient.invalidateQueries("industryGroups");
    },
  });
};

export default useCreateIndustryGroup;
