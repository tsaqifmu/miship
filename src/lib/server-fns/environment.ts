import { createServerFn } from '@tanstack/react-start'
import { api } from '../api.server'
import type { Environment } from '#/types/environment'

export const fetchEnvironment = createServerFn().handler(async () => {
  const { data } = await api.get<Environment[]>('/environments')
  return data
})

export const restartEnvironment = createServerFn()
  .inputValidator((env: string) => env)
  .handler(async ({ data: env }) => {
    const { data } = await api.post(`/environments/${env}/restart`)
    return data
  })

export const startEnvironment = createServerFn()
  .inputValidator((env: string) => env)
  .handler(async ({ data: env }) => {
    const { data } = await api.post(`/environments/${env}/start`)
    return data
  })

export const stopEnvironment = createServerFn()
  .inputValidator((env: string) => env)
  .handler(async ({ data: env }) => {
    const { data } = await api.post(`/environments/${env}/stop`)
    return data
  })
