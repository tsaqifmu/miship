import {
  restartEnvironment,
  startEnvironment,
  stopEnvironment,
} from '#/lib/server-fns/environment'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useEnvironmentActions = () => {
  const queryClient = useQueryClient()

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ['environments'] })

  const restart = useMutation({
    mutationFn: (env: string) => restartEnvironment({ data: env }),
    onSuccess: invalidate,
  })

  const start = useMutation({
    mutationFn: (env: string) => startEnvironment({ data: env }),
    onSuccess: invalidate,
  })
  const stop = useMutation({
    mutationFn: (env: string) => stopEnvironment({ data: env }),
    onSuccess: invalidate,
  })

  const refresh = () => invalidate()

  return { restart, start, stop, refresh }
}
