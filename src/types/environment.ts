export type EnvStatus = 'running' | 'stopped' | 'not_found'
export type EnvAction = 'deploy' | 'logs' | 'restart' | 'start' | 'stop'

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
