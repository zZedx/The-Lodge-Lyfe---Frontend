import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi} from "../../services/apiSettings";
import toast from "react-hot-toast";

const useUpdateSettings = () => {
    const queryClient = useQueryClient();
    const { mutate : updateSetting , status } = useMutation({
        mutationFn: updateSettingsApi,
        onSuccess: () => {
          toast.success("Settings Updated");
          queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (error) => {
          toast.error(error);
        },
      });
      return {updateSetting , status}
}

export default useUpdateSettings