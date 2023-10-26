import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { mutate: createCabin, status } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("Cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
  return { createCabin, status };
}
