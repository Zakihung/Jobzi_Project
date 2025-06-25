import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIndustryGroupApi } from "../../services/IndustryGroupApi";

const useDeleteIndustryGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteIndustryGroupApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries("industryGroups");
    },
  });
};

export default useDeleteIndustryGroup;
