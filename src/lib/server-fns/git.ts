import { createServerFn } from '@tanstack/react-start'
import { api } from '../api.server'

export interface BranchInfo {
  name: string
  lastCommit: string
  lastCommitMessage: string
  updatedAt: string
}

export const fetchBranches = createServerFn().handler(async () => {
  const { data } = await api.get<{
    branches: BranchInfo[]
    lastFetched: string
  }>('/git/branches')

  return data.branches
})
