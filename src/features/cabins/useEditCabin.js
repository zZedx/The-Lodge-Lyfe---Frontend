import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin as editCabinApi} from "../../services/apiCabins";
import toast from "react-hot-toast";


const useEditCabin = () => {
  const queryClient = useQueryClient();
    const { mutate : editCabin, status } = useMutation({
        mutationFn: editCabinApi,
        onSuccess: () => {
          toast.success("Cabin Edited");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (error) => {
          toast.error(error);
        },
      });
      return {editCabin , status}
}

export default useEditCabin