export type EnvStatus = 'running' | 'stopped' | 'not_found'

export interface Environment {
  id: string
  name: string
  port: number
  status: EnvStatus
  branch: string
  commit: string
  message: string
  lastDeploy: string
  uptime: string
}
