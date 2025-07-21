import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProvinceApi } from "../../services/ProvinceApi";

const useDeleteProvince = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProvinceApi,
    onSuccess: () => {
      queryClient.invalidateQueries("provinces"); // Làm mới danh sách tỉnh/thành phố
    },
  });
};

export default useDeleteProvince;
