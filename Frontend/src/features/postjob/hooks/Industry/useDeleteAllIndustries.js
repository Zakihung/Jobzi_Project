import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllIndustriesApi } from "../../services/IndustryApi";

const useDeleteAllIndustries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllIndustriesApi,
    onSuccess: () => {
      queryClient.invalidateQueries("industries");
    },
  });
};

export default useDeleteAllIndustries;
