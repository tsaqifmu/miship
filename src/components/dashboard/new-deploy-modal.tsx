import { useDeployModal } from '#/contexts/deploy-modal-context'
import { branchesQueryOptions } from '#/lib/queries/branches'
import { environmentsQueryOptions } from '#/lib/queries/environments'
import { triggerDeploy } from '#/lib/server-fns/deploy'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { GitBranchIcon, RocketIcon, ServerIcon } from 'lucide-react'
import StatusPill from './status-pill'
import { Input } from '../ui/input'
import { cn } from '#/lib/utils'
import { Button } from '../ui/button'

export function NewDeployModal() {
  const { isOpen, close, defaultEnv, openProgress } = useDeployModal()
  const { data: envs = [] } = useQuery(environmentsQueryOptions)
  const { data: branches = [] } = useQuery(branchesQueryOptions)
  const queryClient = useQueryClient()

  const [selectedEnvName, setSelectedEnvName] = useState<string>('')
  const [selectedBranch, setSelectedBranch] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    if (isOpen) {
      setSelectedEnvName(defaultEnv?.name ?? '')
      setSelectedBranch('')
      setSearch('')
    }
  }, [isOpen, defaultEnv])

  const deployMutation = useMutation({
    mutationFn: () =>
      triggerDeploy({
        data: { environment: selectedEnvName, branch: selectedBranch },
      }),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['environments'] })
      close()
      openProgress(result.deployId)
    },
  })

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="max-w-[600px] gap-0 p-0"
        showCloseButton={false}
      >
        <DialogHeader className="flex-row items-center gap-3 border-b px-5 py-4">
          <span className="text-green inline-flex size-7 items-center justify-center rounded-lg bg-green-50">
            <RocketIcon size={14} />
          </span>
          <div>
            <DialogTitle className="text-[14px]">New deployment</DialogTitle>
            <p className="text-ink-4 text-[11.5px]">
              Pick an environment and a branch to ship.
            </p>
          </div>
        </DialogHeader>

        {/* Target environment */}
        <div className="px-5 pt-4 pb-2">
          <p className="text-ink-4 mb-2 text-[11px] font-semibold tracking-widest uppercase">
            Target environment
          </p>
          <div className="flex flex-col gap-1.5">
            {envs.map((env) => {
              const checked = selectedEnvName === env.name
              return (
                <label
                  key={env.name}
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
                    checked
                      ? 'bg-green-50 shadow-[inset_0_0_0_1px_var(--green)]'
                      : 'hover:bg-surface-hover shadow-[0_0_0_0.5px_var(--line-strong)]',
                  )}
                >
                  <input
                    type="radio"
                    className="hidden"
                    checked={checked}
                    onChange={() => setSelectedEnvName(env.name)}
                  />
                  <ServerIcon size={13} className="text-ink-3 shrink-0" />
                  <span className="text-ink-1 min-w-[90px] text-[13px] font-medium">
                    {env.name}
                  </span>
                  <span className="text-ink-3 font-mono text-[11.5px]">
                    {env.branch ?? '—'}
                  </span>
                  <StatusPill status={env.containerStatus} />
                  <span className="flex-1" />
                  <span className="text-ink-4 font-mono text-[11px]">
                    :{env.port}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Branch */}
        <div className="px-5 pt-2 pb-4">
          <p className="text-ink-4 mb-2 text-[11px] font-semibold tracking-widest uppercase">
            Branch
          </p>
          <Input
            placeholder="Search branches…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 h-8 text-[13px]"
          />
          <div className="max-h-[220px] overflow-y-auto rounded-lg shadow-[0_0_0_0.5px_var(--line-strong)]">
            {filteredBranches.map((b) => {
              const selected = selectedBranch === b.name
              return (
                <div
                  key={b.name}
                  onClick={() => setSelectedBranch(b.name)}
                  className={cn(
                    'flex cursor-pointer items-center gap-2.5 px-3 py-2.5 transition-colors',
                    selected ? 'bg-green-50' : 'hover:bg-surface-hover',
                  )}
                >
                  <GitBranchIcon size={11} className="text-ink-4 shrink-0" />
                  <span
                    className={cn(
                      'flex-1 overflow-hidden font-mono text-[12.5px] text-ellipsis whitespace-nowrap',
                      selected
                        ? 'font-semibold text-green-700'
                        : 'text-ink-1 font-medium',
                    )}
                  >
                    {b.name}
                  </span>
                  <span className="text-ink-4 font-mono text-[11px]">
                    {b.lastCommit}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="bg-surface-hover border-t px-5 py-3">
          <p className="text-ink-4 mr-auto text-[11.5px]">
            Deploy{' '}
            <span className="text-ink-1 font-mono">
              {selectedBranch || '…'}
            </span>
            {' → '}
            <span className="text-ink-1 font-mono">
              {selectedEnvName || '…'}
            </span>
          </p>
          <Button variant="outline" size="sm" onClick={close}>
            Cancel
          </Button>
          <Button
            size="sm"
            className="gap-1.5"
            disabled={
              !selectedEnvName || !selectedBranch || deployMutation.isPending
            }
            onClick={() => deployMutation.mutate()}
          >
            <RocketIcon size={12} />
            {deployMutation.isPending ? 'Deploying…' : 'Deploy now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
