import { cn } from '#/lib/utils'
import { TrendingUp } from 'lucide-react'

type Accent = 'running' | 'stopped' | 'notfound' | 'neutral'

interface StatCardProps {
  label: string
  value: number
  sub?: string
  accent?: Accent
  icon: React.ReactNode
  trend?: { dir: 'up' | 'down'; value: string }
}

const accentMap: Record<
  Accent,
  { iconBg: string; iconFg: string; iconRing: string }
> = {
  running: {
    iconBg: 'bg-running-bg',
    iconFg: 'text-running',
    iconRing: 'shadow-[inset_0_0_0_0.5px_rgba(15,110,86,0.2)]',
  },
  stopped: {
    iconBg: 'bg-stopped-bg',
    iconFg: 'text-stopped',
    iconRing: 'shadow-[inset_0_0_0_0.5px_rgba(107,107,115,0.2)]',
  },
  notfound: {
    iconBg: 'bg-notfound-bg',
    iconFg: 'text-notfound',
    iconRing: 'shadow-[inset_0_0_0_0.5px_rgba(194,65,12,0.2)]',
  },
  neutral: {
    iconBg: 'bg-surface-subtle',
    iconFg: 'text-ink-3',
    iconRing: 'shadow-[inset_0_0_0_0.5px_var(--line-neutral)]',
  },
}

const StatCard = ({
  label,
  value,
  sub,
  accent = 'neutral',
  icon,
  trend,
}: StatCardProps) => {
  const a = accentMap[accent]

  return (
    <div className="bg-surface rounded-lg px-4 py-3.5 shadow-[0_0_0_0.5px_var(--line-strong),0_1px_0_rgba(15,15,20,0.025)]">
      {/* Header Row */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.75">
          <span
            className={cn(
              'inline-flex size-5.5 items-center justify-center rounded-[6px]',
              a.iconBg,
              a.iconFg,
              a.iconRing,
            )}
          >
            {icon}
          </span>
          <span className="text-ink-3 text-[12px] font-medium tracking-[-0.005em]">
            {label}
          </span>
        </div>

        {trend && (
          <span
            className={cn(
              'inline-flex items-center gap-0.75 font-mono text-[11px]',
              trend.dir === 'up' ? 'text-running-text' : 'text-ink-3',
            )}
          >
            <TrendingUp
              size={11}
              className={cn(trend.dir === 'down' && '-scale-y-100')}
            />
            {trend.value}
          </span>
        )}
      </div>

      {/* Value Row */}
      <div className="flex items-baseline gap-2">
        <span className="text-ink text-[30px] leading-none font-semibold tracking-tight">
          {value}
        </span>
        {sub && <span className="text-ink-4 text-[12px]">{sub}</span>}
      </div>
    </div>
  )
}

export default StatCard
