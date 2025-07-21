import { useQuery } from "@tanstack/react-query";
import { getAllProvinceAlphabetApi } from "../../services/ProvinceApi";

const useGetAllProvinceAlphabet = () => {
  return useQuery({
    queryKey: ["provinces", "alphabet"],
    queryFn: getAllProvinceAlphabetApi,
  });
};

export default useGetAllProvinceAlphabet;
