import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllIndustryGroupsApi } from "../../services/IndustryGroupApi";

const useDeleteAllIndustryGroups = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllIndustryGroupsApi,
    onSuccess: () => {
      queryClient.invalidateQueries("industryGroups");
    },
  });
};

export default useDeleteAllIndustryGroups;
