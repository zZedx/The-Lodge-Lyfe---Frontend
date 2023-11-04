import { useQuery } from '@tanstack/react-query'

import { getAllUsers} from '../../services/apiAuth'
import { useSearchParams } from 'react-router-dom'

const useUsers = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('users') || 'all'

  const {isLoading , data : users , isError} = useQuery({
    queryKey : ['users' , query],
    queryFn : () => getAllUsers(query)
  })

  return {isLoading , users , isError}
}

export default useUsers