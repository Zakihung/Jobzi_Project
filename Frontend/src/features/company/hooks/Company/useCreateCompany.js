import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompanyApi } from "../../services/CompanyApi";

const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCompanyApi,
    onSuccess: () => {
      queryClient.invalidateQueries("companies"); // Làm mới danh sách công ty
    },
  });
};

export default useCreateCompany;
