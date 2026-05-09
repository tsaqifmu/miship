import { Link } from '@tanstack/react-router'
import { ChevronDownIcon, ActivityIcon } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ShipIcon } from './ship-icon'
import { DashboardIcon, HistoryIcon, RocketIcon, SettingsIcon } from './icons'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { icon: DashboardIcon, label: 'Dashboard', href: '/' },
  { icon: RocketIcon, label: 'Deploy', href: '/deploy' },
  { icon: HistoryIcon, label: 'History', href: '/history' },
  { icon: SettingsIcon, label: 'Settings', href: '/settings' },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-5 py-4.5">
        <div className="flex items-center gap-2.25">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-emerald-50 text-emerald-700 shadow-[inset_0_0_0_0.5px_rgba(15,110,86,0.2)]">
            <ShipIcon size={17} />
          </span>
          <div className="flex flex-col justify-center leading-[1.1]">
            <span className="text-sm font-semibold tracking-[-0.015em]">
              MiShip
            </span>
            <span className="mt-0.5 font-mono text-[10.5px] text-[#98989f]">
              v2.4.1
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-4 pt-3 pb-2">
          <SidebarGroupContent>
            <div className="flex cursor-pointer items-center gap-2.25 rounded-[7px] bg-[#fafaf9] px-[9px] py-[7px] shadow-[0_0_0_0.5px_rgba(0,0,0,0.08)] dark:bg-slate-900 dark:shadow-[0_0_0_0.5px_rgba(255,255,255,0.08)]">
              <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#0F6E56] to-[#1a8d72] text-[9.5px] font-bold text-white">
                MF
              </span>
              <div className="flex min-w-0 flex-1 flex-col leading-[1.2]">
                <span className="text-[12.5px] font-medium">MIFI-APP</span>
                <span className="text-[10.5px] text-[#98989f]">FE Manager</span>
              </div>
              <ChevronDownIcon size={13} className="shrink-0 text-[#98989f]" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-[10.5px] font-semibold text-[#98989f]">
            WORKSPACE
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(({ icon: Icon, label, href }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton
                    asChild
                    className="text-[#4a4a4f] hover:bg-[#f7f7f5] data-[active=true]:bg-[#ecf7f2] data-[active=true]:font-semibold data-[active=true]:text-[#0a5a46] data-[active=true]:shadow-[inset_0_0_0_0.5px_rgba(15,110,86,0.18)] dark:hover:bg-slate-800 dark:data-[active=true]:bg-emerald-950/30 dark:data-[active=true]:text-emerald-400"
                  >
                    <Link
                      to={href}
                      activeOptions={{ exact: href === '/' }}
                      activeProps={{ 'data-active': 'true' }}
                      inactiveProps={{ 'data-active': undefined }}
                    >
                      <Icon size={15} />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-0 p-0">
        <div className="px-4 pb-3">
          <div className="rounded-xl bg-[linear-gradient(180deg,rgba(15,110,86,0.04),rgba(15,110,86,0.01))] px-2.75 py-2.5 shadow-[0_0_0_0.5px_rgba(15,110,86,0.18)]">
            <div className="mb-1 flex items-center gap-1.5">
              <ActivityIcon size={12} className="text-emerald-600" />
              <span className="text-[11px] font-semibold tracking-[-0.005em] text-emerald-700">
                System healthy
              </span>
            </div>
            <p className="text-[11px] leading-[1.45] text-[#98989f]">
              2 of 4 environments running. Last sync{' '}
              <span className="font-mono">2m</span> ago.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t px-5 py-3">
          <div className="flex items-center gap-1.75">
            <span className="h-1.75 w-1.75 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(15,110,86,0.18)]" />
            <span className="text-[11.5px] font-medium">Connected</span>
            <span className="text-[#98989f]">·</span>
            <span className="font-mono text-[10.5px] text-[#98989f]">
              SSO ok
            </span>
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
