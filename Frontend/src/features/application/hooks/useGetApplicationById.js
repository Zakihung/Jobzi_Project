import { useQuery } from "@tanstack/react-query";
import { getApplicationByIdApi } from "../services/applicationApi";

const useGetApplicationById = (application_id) => {
  return useQuery({
    queryKey: ["application", application_id],
    queryFn: () => getApplicationByIdApi(application_id),
    enabled: !!application_id, // Chỉ chạy query nếu application_id tồn tại
  });
};

export default useGetApplicationById;
