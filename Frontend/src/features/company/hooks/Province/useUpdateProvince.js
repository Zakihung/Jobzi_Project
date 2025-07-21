import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProvinceApi } from "../../services/ProvinceApi";

const useUpdateProvince = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProvinceApi,
    onSuccess: () => {
      queryClient.invalidateQueries("provinces"); // Làm mới danh sách tỉnh/thành phố
    },
  });
};

export default useUpdateProvince;
