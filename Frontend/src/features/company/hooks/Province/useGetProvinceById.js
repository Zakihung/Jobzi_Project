import { useQuery } from "@tanstack/react-query";
import { getProvinceByIdApi } from "../../services/ProvinceApi";

const useGetProvinceById = (id) => {
  return useQuery({
    queryKey: ["province", id],
    queryFn: () => getProvinceByIdApi(id),
    enabled: !!id,
  });
};

export default useGetProvinceById;
