import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompanyIndustryApi } from "../../services/Company_IndustryApi";

const useCreateCompanyIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompanyIndustryApi,
    onSuccess: () => {
      queryClient.invalidateQueries("companyIndustries"); // Làm mới danh sách company industry
    },
  });
};

export default useCreateCompanyIndustry;
