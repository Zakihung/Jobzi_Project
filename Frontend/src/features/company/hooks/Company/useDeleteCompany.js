import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCompanyApi } from "../../services/CompanyApi";

const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCompanyApi,
    onSuccess: () => {
      queryClient.invalidateQueries("companies"); // Làm mới danh sách công ty
    },
  });
};

export default useDeleteCompany;
