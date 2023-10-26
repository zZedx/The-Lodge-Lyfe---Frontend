import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/apiCabins";

const useCabins = () => {
  const {
    isLoading,
    data: cabins,
    isError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getAllCabins,
  });

  return { isLoading, cabins, isError };
};
export default useCabins;
