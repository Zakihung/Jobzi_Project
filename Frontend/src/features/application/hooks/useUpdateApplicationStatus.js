import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateApplicationStatusApi } from "../services/applicationApi";
import { App } from "antd";

const useUpdateApplicationStatus = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }) => updateApplicationStatusApi({ id, status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
      queryClient.invalidateQueries(["applicationsByCandidate"]);
    },
    onError: (error) => {
      message.error(`Cập nhật trạng thái thất bại: ${error.message}`);
    },
  });
};

export default useUpdateApplicationStatus;
