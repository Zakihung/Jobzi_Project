import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJobPositionApi } from "../../services/Job_PositionApi";

const useUpdateJobPosition = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateJobPositionApi(id, data),
    onSuccess: () => {
      // Làm mới danh sách và chi tiết job position sau khi cập nhật
      queryClient.invalidateQueries("jobPositions");
      queryClient.invalidateQueries("jobPosition");
    },
  });
};

export default useUpdateJobPosition;
