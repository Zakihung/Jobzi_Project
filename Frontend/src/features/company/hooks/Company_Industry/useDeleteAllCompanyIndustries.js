import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllCompanyIndustriesApi } from "../../services/Company_IndustryApi";

const useDeleteAllCompanyIndustries = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAllCompanyIndustriesApi,
    onSuccess: () => {
      queryClient.invalidateQueries("companyIndustries"); // Làm mới danh sách company industry
    },
  });
};

export default useDeleteAllCompanyIndustries;
