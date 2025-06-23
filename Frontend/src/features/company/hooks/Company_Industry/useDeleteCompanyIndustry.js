import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompanyIndustryApi } from "../../services/Company_IndustryApi";

const useDeleteCompanyIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyIndustryApi,
    onSuccess: () => {
      queryClient.invalidateQueries("companyIndustries"); // Làm mới danh sách company industry
    },
  });
};

export default useDeleteCompanyIndustry;
