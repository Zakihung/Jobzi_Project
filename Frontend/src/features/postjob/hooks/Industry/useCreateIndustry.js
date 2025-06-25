import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIndustryApi } from "../../services/IndustryApi";

const useCreateIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createIndustryApi,
    onSuccess: () => {
      queryClient.invalidateQueries("industries");
    },
  });
};

export default useCreateIndustry;
