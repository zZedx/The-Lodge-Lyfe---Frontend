import { useQuery } from '@tanstack/react-query'

import { getCurrentUser } from '../../services/apiAuth'

const useUser = () => {
  const {isLoading , data : user , isError} = useQuery({
    queryKey : ['user'],
    queryFn : getCurrentUser,
    retry : 1
  })

  return {isLoading , user , isError}
}

export default useUser