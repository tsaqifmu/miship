import { queryOptions } from '@tanstack/react-query'
import { fetchEnvironment } from '../server-fns/environment'

export const environmentsQueryOptions = queryOptions({
  queryKey: ['environments'],
  queryFn: () => fetchEnvironment(),
  refetchInterval: 30_000,
})
