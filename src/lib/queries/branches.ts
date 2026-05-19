import { queryOptions } from '@tanstack/react-query'
import { fetchBranches } from '../server-fns/git'

export const branchesQueryOptions = queryOptions({
  queryKey: ['branches'],
  queryFn: () => fetchBranches(),
  staleTime: 60_000,
})
