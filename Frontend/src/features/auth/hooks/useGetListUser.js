import { useQuery } from "@tanstack/react-query";
import { getListUser } from "../services/userApi";

const useGetListUser = () => {
  return useQuery({
    queryKey: ["userList"],
    queryFn: getListUser,
  });
};

export default useGetListUser;
