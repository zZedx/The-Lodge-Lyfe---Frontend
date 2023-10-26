import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

const useSettings = () => {
  const {
    isLoading,
    data: settings,
    isError,
  } = useQuery({
    queryFn: getSettings,
    queryKey: ["settings"],
  });
  return { isLoading, settings, isError };
};

export default useSettings;
