import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplicationApi } from "../services/applicationApi";
import { App } from "antd";

const useDeleteApplication = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteApplicationApi(id),
    onSuccess: () => {
      message.success("Hủy ứng tuyển thành công!");
      queryClient.invalidateQueries(["applications"]);
      queryClient.invalidateQueries(["applicationsByCandidate"]);
    },
    onError: (error) => {
      message.error(`Hủy ứng tuyển thất bại: ${error.message}`);
    },
  });
};

export default useDeleteApplication;
