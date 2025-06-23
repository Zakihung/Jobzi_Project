import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadLogoCompanyApi } from "../../services/CompanyApi";

const useUploadLogoCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadLogoCompanyApi,
    onSuccess: () => {
      queryClient.invalidateQueries("companies"); // Làm mới danh sách công ty
    },
  });
};

export default useUploadLogoCompany;
