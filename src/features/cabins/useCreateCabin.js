import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi} from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin(){
  const queryClient = useQueryClient();
    const { mutate, status } = useMutation({
        mutationFn: createCabinApi,
        onSuccess: () => {
          toast.success("Cabin created");
          reset();
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      });
}