import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProvinceApi } from "../../services/ProvinceApi";

const useCreateProvince = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProvinceApi,
    onSuccess: () => {
      queryClient.invalidateQueries("provinces"); // Làm mới danh sách tỉnh/thành phố
    },
  });
};

export default useCreateProvince;
