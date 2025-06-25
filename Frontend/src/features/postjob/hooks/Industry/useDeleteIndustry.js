import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIndustryApi } from "../../services/IndustryApi";

const useDeleteIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteIndustryApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries("industries");
    },
  });
};

export default useDeleteIndustry;
