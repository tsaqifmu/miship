import { createServerFn } from '@tanstack/react-start'
import { api } from '../api.server'

interface TriggerDeployInput {
  environment: string
  branch: string
}

interface TriggerDeployResult {
  deployId: string
  message: string
}

export const triggerDeploy = createServerFn()
  .inputValidator((input: TriggerDeployInput) => input)
  .handler(async ({ data }) => {
    const { environment, branch } = data
    const { data: result } = await api.post<TriggerDeployResult>('/deploy', {
      environment,
      branch,
    })
    return result
  })
