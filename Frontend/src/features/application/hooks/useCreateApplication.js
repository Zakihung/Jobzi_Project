import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createApplicationApi } from "../services/applicationApi";
import { App } from "antd";

const useCreateApplication = () => {
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      job_post_id,
      candidate_id,
      resume_file_id,
      online_resume_id,
    }) =>
      createApplicationApi({
        job_post_id,
        candidate_id,
        resume_file_id,
        online_resume_id,
      }),
    onSuccess: () => {
      message.success("Ứng tuyển thành công!");
      queryClient.invalidateQueries(["applications"]);
      queryClient.invalidateQueries(["applicationsByCandidate"]);
    },
    onError: (error) => {
      message.error(`Ứng tuyển thất bại: ${error.message}`);
    },
  });
};

export default useCreateApplication;
