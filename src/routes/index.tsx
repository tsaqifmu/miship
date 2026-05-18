import EnvCard from '#/components/dashboard/env-card'
import StatCard from '#/components/dashboard/stat-card'
import { environmentsQueryOptions } from '#/lib/queries/environments'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import {
  ActivityIcon,
  AlertCircleIcon,
  PowerIcon,
  RocketIcon,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(environmentsQueryOptions),
  component: Dashboard,
})

function Dashboard() {
  const { data: envs = [] } = useQuery(environmentsQueryOptions)

  console.log('ini data', envs)

  const counts = {
    running: envs.filter((e) => e.status === 'running').length,
    stopped: envs.filter((e) => e.status === 'stopped').length,
    notfound: envs.filter((e) => e.status === 'not_found').length,
  }
  return (
    <div className="flex flex-col gap-4.5 px-6 py-5 pb-10">
      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        <StatCard
          label="Running"
          value={counts.running}
          accent="running"
          icon={<ActivityIcon size={12} />}
          sub={`of ${envs.length} total`}
          trend={{ dir: 'up', value: '+1' }}
        />
        <StatCard
          label="Stopped"
          value={counts.stopped}
          accent="stopped"
          icon={<PowerIcon size={12} />}
          sub="manually halted"
        />
        <StatCard
          label="Not found"
          value={counts.notfound}
          accent="notfound"
          icon={<AlertCircleIcon size={12} />}
          sub="needs attention"
        />
        <StatCard
          label="Deploys today"
          value={7}
          accent="neutral"
          icon={<RocketIcon size={12} />}
          sub="across 3 envs"
          trend={{ dir: 'up', value: '+12%' }}
        />
      </div>

      {/* Section header */}
      <div className="mt-1 flex items-baseline justify-between">
        <div>
          <h2 className="text-ink text-[15px] font-semibold tracking-[-0.015em]">
            Environments
          </h2>
          <p className="text-ink-4 mt-0.5 text-[12px]">
            Live state of every worktree managed by MiShip.
          </p>
        </div>
        <div className="text-ink-3 flex items-center gap-3.5 text-[11.5px]">
          <span className="flex items-center gap-1.5">
            <span className="bg-running size-1.5 rounded-full" /> running
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-stopped size-1.5 rounded-full" /> stopped
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-notfound size-1.5 rounded-full" /> not_found
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        {envs.map((env) => (
          <EnvCard key={env.name} env={env} />
        ))}
      </div>
    </div>
  )
}
