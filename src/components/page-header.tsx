import { cn } from '#/lib/utils'
import { Link } from '@tanstack/react-router'
import { ChevronRight, Plus, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { Button } from './ui/button'

export interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  breadcrumbs: Breadcrumb[]
  network: boolean
  refreshing: boolean
  onRefresh: () => void
  onNewDeploy: () => void
}

const PageHeader = ({
  title,
  breadcrumbs,
  network,
  refreshing,
  onRefresh,
  onNewDeploy,
}: PageHeaderProps) => {
  return (
    <header className="bg-surface/80 border-line-neutral sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3.75 backdrop-blur-md backdrop-saturate-150">
      {/* Breadcrumbs + Title */}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="text-ink-4 flex items-center gap-1 text-[11px]">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1">
              {index > 0 && <ChevronRight size={9} className="text-ink-5" />}
              {crumb.href ? (
                <Link
                  to={crumb.href}
                  className="hover:text-ink-2 transition-colors duration-120"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={
                    index === breadcrumbs.length - 1 ? 'text-ink-2' : ''
                  }
                >
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </div>

        <h1 className="text-ink text-[18px] leading-none font-semibold">
          {title}
        </h1>
      </div>

      {/* Network Chip */}
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.25 text-[11.5px] font-medium',
          network
            ? 'bg-running-bg text-running-text'
            : 'bg-notfound-bg text-notfound-text',
        )}
      >
        {network ? <Wifi size={11} /> : <WifiOff size={11} />}
        {network ? 'Online' : 'Offline'}
      </div>

      {/* Refresh */}
      <Button
        variant="outline"
        size="sm"
        onClick={onRefresh}
        disabled={refreshing}
        className="text-ink-2 border-line-neutral gap-1.5"
      >
        <RefreshCw size={12} className={cn(refreshing && 'animate-spin')} />
        Refresh
      </Button>

      {/* New deploy */}
      <Button size="sm" onClick={onNewDeploy} className="gap-1.5">
        <Plus size={12} />
        New deploy
        <kbd className="ml-0.5 rounded bg-white/20 px-1 py-0.5 font-mono text-[10px] leading-none opacity-60">
          ⌘N
        </kbd>
      </Button>
    </header>
  )
}

export default PageHeader
