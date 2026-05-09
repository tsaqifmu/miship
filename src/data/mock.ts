import type { Environment } from '#/types/environment'

export const MOCK_ENVIRONMENTS: Environment[] = [
  {
    id: 'production',
    name: 'PRODUCTION',
    port: 3030,
    status: 'running',
    branch: 'main',
    commit: '587d700',
    message: 'fix: update profile display...',
    lastDeploy: '4 hours ago',
    uptime: '14d 03h',
  },
  // ... dst
]
