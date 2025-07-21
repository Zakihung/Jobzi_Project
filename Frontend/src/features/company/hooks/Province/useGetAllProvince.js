import { useQuery } from "@tanstack/react-query";
import { getAllProvinceApi } from "../../services/ProvinceApi";

const useGetAllProvince = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: getAllProvinceApi,
  });
};

export default useGetAllProvince;
