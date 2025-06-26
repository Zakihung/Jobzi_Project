import { useQuery } from "@tanstack/react-query";
import { getListEmployerApi } from "../services/EmployerApi";

const useGetListEmployer = () => {
  return useQuery({
    queryKey: ["employers"],
    queryFn: () => getListEmployerApi(),
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetListEmployer;
