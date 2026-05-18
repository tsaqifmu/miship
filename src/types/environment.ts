export type EnvStatus = 'running' | 'stopped' | 'not_found'

export interface Environment {
  // id: string
  name: string
  port: number
  branch: string | null
  commitHash: string | null
  commitMessage: string | null
  containerStatus: EnvStatus
  lastDeploy: string | null
  uptime?: string
}
