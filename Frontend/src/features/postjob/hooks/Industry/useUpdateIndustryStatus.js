import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateIndustryStatusApi } from "../../services/IndustryApi";

const useUpdateIndustryStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateIndustryStatusApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("industries");
      queryClient.invalidateQueries("industry");
    },
  });
};

export default useUpdateIndustryStatus;
