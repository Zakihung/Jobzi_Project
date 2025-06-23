import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyApi } from "../../services/CompanyApi";

const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCompanyApi,
    onSuccess: () => {
      queryClient.invalidateQueries("companies"); // Làm mới danh sách công ty
    },
  });
};

export default useUpdateCompany;
