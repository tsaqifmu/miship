import { cn } from '#/lib/utils'
import type { Environment } from '#/types/environment'
import {
  GitBranchIcon,
  Play,
  RocketIcon,
  RotateCcw,
  ServerIcon,
  Square,
  Terminal,
} from 'lucide-react'
import StatusPill from './status-pill'
import { Button } from '../ui/button'

interface EnvCardProps {
  env: Environment
  onAction?: (
    action: 'deploy' | 'logs' | 'restart' | 'start' | 'stop',
    env: Environment,
  ) => void
}

function MetaCell({
  label,
  value,
  mono = false,
  align = 'left',
}: Readonly<{
  label: string
  value: string
  mono?: boolean
  align?: 'left' | 'right' | 'center'
}>) {
  return (
    <div
      className={cn(
        'leading-[1.3]',
        align === 'right' && 'text-right',
        align === 'center' && 'text-center',
      )}
    >
      <div className="text-ink-4 text-[10.5px] font-semibold tracking-[0.06em] uppercase">
        {label}
      </div>
      <div
        className={cn(
          'text-ink-1 mt-0.5 text-[12px] font-medium',
          mono && 'font-mono',
        )}
      >
        {value}
      </div>
    </div>
  )
}

const EnvCard = ({ env, onAction }: EnvCardProps) => {
  const isRunning = env.containerStatus === 'running'
  const isStopped = env.containerStatus === 'stopped'
  const isMissing = env.containerStatus === 'not_found'

  let stripeBackground = 'transparent'
  if (isRunning)
    stripeBackground =
      'linear-gradient(90deg, var(--running) 0%, var(--running)60%, transparent 100%)'
  else if (isMissing)
    stripeBackground =
      'linear-gradient(90deg, var(--notfound) 0%, transparent 100%)'

  return (
    <div className="bg-surface hover:shadow-[0_0_0_0.5px_var(--line-s trong),0_8px_24px_rgba(15,15,20,0.06)] flex flex-col overflow-hidden rounded-lg shadow-[0_0_0_0.5px_var(--line-strong),0_1px_0_rgba(15,15,20,0.025)] transition-[box-shadow,transform] duration-160 hover:-translate-y-px">
      {/* Top Stripe */}
      <div
        className="h-0.75"
        style={{
          background: stripeBackground,
          opacity: 0.85,
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3.5 pb-2">
        <div className="flex items-center gap-2.25">
          <span
            className={cn(
              'inline-flex size-6.5 items-center justify-center rounded-[7px] shadow-[inset_0_0_0_0.5px_var(--line-neutral)]',
              isRunning
                ? 'bg-running-bg text-running'
                : 'bg-surface-subtletext-ink-3',
            )}
          >
            <ServerIcon size={14} />
          </span>
          <div className="flex flex-col leading-[1.15]">
            <span className="text-ink text-[13px] font-semibold">
              {env.name}
            </span>
            <span className="text-ink-4 font-mono text-[11px]">
              localhost:{env.port}
            </span>
          </div>
        </div>
        <StatusPill status={env.containerStatus} />
      </div>

      {/* 3. Branch + commit */}
      <div className="px-4 pb-2.5">
        <div className="bg-surface-hover flex items-center gap-1.75 rounded-[7px] px-2.25 py-1.75 shadow-[inset_0_0_0_0.5px_var(--line-neutral)]">
          <GitBranchIcon size={13} className="text-ink-3 shrink-0" />
          <span className="text-ink-1 flex-1 overflow-hidden font-mono text-[12px] font-medium text-ellipsis whitespace-nowrap">
            {env.branch}
          </span>
          <span className="text-ink-3 bg-surface rounded px-1.5 py-px font-mono text-[11px] shadow-[0_0_0_0.5px_var(--line-neutral)]">
            {env.commitHash}
          </span>
        </div>
        <p className="text-ink-2 mt-2 line-clamp-2 pl-0.5 text-[12px] leading-normal">
          <span className="text-ink-4 font-medium">—</span> {env.commitMessage}
        </p>
      </div>

      {/* 4. Meta strip */}
      <div className="grid grid-cols-3 px-4 py-2.5 shadow-[inset_0_0.5px_0_var(--line-neutral)]">
        <MetaCell label="Port" value={String(env.port)} mono />
        <MetaCell
          label="Last deploy"
          value={env.lastDeploy ?? '-'}
          align="center"
        />
        <MetaCell label="Uptime" value={env.uptime ?? '-'} mono align="right" />
      </div>

      {/* 5. Actions */}
      <div className="bg-surface-hover flex items-center gap-1.5 px-3 py-2.5 shadow-[inset_0_0.5px_0_var(--line-neutral)]">
        <Button
          size="sm"
          className="gap-1.25"
          onClick={() => onAction?.('deploy', env)}
        >
          <RocketIcon size={12} /> Deploy
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.25"
          onClick={() => onAction?.('logs', env)}
        >
          <Terminal size={12} /> Logs
        </Button>
        {isRunning && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.25"
            onClick={() => onAction?.('restart', env)}
          >
            <RotateCcw size={12} /> Restart
          </Button>
        )}
        {(isStopped || isMissing) && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.25"
            onClick={() => onAction?.('start', env)}
          >
            <Play size={11} /> Start
          </Button>
        )}
        <span className="flex-1" />
        {isRunning && (
          <Button
            variant="outline"
            size="sm"
            className="text-destructive border-line-danger gap-1.25"
            onClick={() => onAction?.('stop', env)}
          >
            <Square size={10} /> Stop
          </Button>
        )}
      </div>
    </div>
  )
}

export default EnvCard
