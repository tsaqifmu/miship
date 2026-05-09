import { cn } from '#/lib/utils'
import type { EnvStatus } from '#/types/environment'

const statusMap: Record<
  EnvStatus,
  { label: string; bg: string; text: string; dotBg: string; pulse: boolean }
> = {
  running: {
    label: 'running',
    bg: 'bg-running-bg',
    text: 'text-running-text',
    dotBg: 'bg-running',
    pulse: true,
  },
  stopped: {
    label: 'stopped',
    bg: 'bg-stopped-bg',
    text: 'text-stopped-text',
    dotBg: 'bg-stopped',
    pulse: false,
  },
  not_found: {
    label: 'not_found',
    bg: 'bg-notfound-bg',
    text: 'text-notfound-text',
    dotBg: 'bg-notfound',
    pulse: false,
  },
}

const StatusPill = ({ status }: { status: EnvStatus }) => {
  const s = statusMap[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.25 py-0.5 text-[12px] font-medium',
        s.bg,
        s.text,
      )}
    >
      <span className="relative flex size-1.5">
        {s.pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              s.dotBg,
            )}
          />
        )}
        <span
          className={cn('relative inline-flex size-1.5 rounded-full', s.dotBg)}
        />
      </span>
      {s.label}
    </span>
  )
}

export default StatusPill
