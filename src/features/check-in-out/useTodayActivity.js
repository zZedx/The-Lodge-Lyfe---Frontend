import { useQuery } from '@tanstack/react-query'
import { getStaysTodayActivity } from '../../services/apiBookings'

const useTodayActivity = () => {
  const {data : activities , isLoading , isError} = useQuery({
    queryKey : ["todayActivity"],
    queryFn : getStaysTodayActivity
  })
    return {activities , isLoading , isError}
}

export default useTodayActivity