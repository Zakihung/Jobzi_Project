import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIndustryGroupStatusApi } from "../../services/IndustryGroupApi";

const useUpdateIndustryGroupStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateIndustryGroupStatusApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("industryGroups");
      queryClient.invalidateQueries("industryGroup");
    },
  });
};

export default useUpdateIndustryGroupStatus;
