import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanyIndustryApi } from "../../services/Company_IndustryApi";

const useUpdateCompanyIndustry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCompanyIndustryApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries("companyIndustries"); // Làm mới danh sách company industry
    },
  });
};

export default useUpdateCompanyIndustry;
