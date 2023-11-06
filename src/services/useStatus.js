import { useQuery } from "@tanstack/react-query"
import { checkStatus } from "./apiAuth"

const useStatus = () => {
  const {isLoading , isError} = useQuery({
    queryKey: "status",
    queryFn:checkStatus,
    retry:true
  })
  return {isLoading , isError}
}

export default useStatus