import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIndustryGroupApi } from "../../services/Industry_GroupApi";

const useUpdateIndustryGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateIndustryGroupApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("industryGroups");
      queryClient.invalidateQueries("industryGroup");
    },
  });
};

export default useUpdateIndustryGroup;
