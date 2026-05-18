import { createServerFn } from '@tanstack/react-start'
import { api } from '../api.server'
import type { Environment } from '#/types/environment'

export const fetchEnvironment = createServerFn().handler(async () => {
  const { data } = await api.get<Environment[]>('/environments')
  return data
})
