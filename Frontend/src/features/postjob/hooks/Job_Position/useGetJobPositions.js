import { useQuery } from "@tanstack/react-query";
import { getListJobPositionApi } from "../../services/Job_PositionApi";

const useGetJobPositions = () => {
  return useQuery({
    queryKey: ["jobPositions"],
    queryFn: getListJobPositionApi,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};

export default useGetJobPositions;
