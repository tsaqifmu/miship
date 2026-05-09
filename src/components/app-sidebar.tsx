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
    <Sidebar className="border-line-neutral border-r">
      <SidebarHeader className="border-line-neutral flex h-17.5 justify-center border-b px-5">
        <div className="flex items-center gap-2.25">
          <span className="bg-brand-50 text-brand inline-flex h-7 w-7 items-center justify-center rounded-[7px] shadow-[inset_0_0_0_0.5px_var(--line-brand-strong)]">
            <ShipIcon size={17} />
          </span>
          <div className="flex flex-col justify-center leading-[1.1]">
            <span className="text-ink text-sm font-semibold tracking-[-0.015em]">
              MiShip
            </span>
            <span className="text-ink-4 mt-0.5 font-mono text-[10.5px]">
              v2.4.1
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Workspace selector */}
        <SidebarGroup className="px-4 pt-3 pb-2">
          <SidebarGroupContent>
            <div className="bg-surface-hover flex cursor-pointer items-center gap-2.25 rounded-[7px] px-2.25 py-1.75 shadow-[0_0_0_0.5px_var(--line-neutral)]">
              <span className="from-brand to-brand-mid flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-lg bg-linear-to-br text-[9.5px] font-bold text-white">
                MF
              </span>
              <div className="flex min-w-0 flex-1 flex-col leading-[1.2]">
                <span className="text-ink-1 text-[12.5px] font-medium">
                  MIFI-APP
                </span>
                <span className="text-ink-4 text-[10.5px]">FE Manager</span>
              </div>
              <ChevronDownIcon size={13} className="text-ink-4 shrink-0" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Nav */}
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-ink-4 px-2.5 pb-1 text-[10.5px] font-semibold tracking-[0.06em]">
            WORKSPACE
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5 overflow-visible">
              {navItems.map(({ icon: Icon, label, href }) => (
                <SidebarMenuItem key={label} className="overflow-visible">
                  <SidebarMenuButton
                    asChild
                    className="text-ink-2 hover:text-ink-1 data-[active=true]:bg-brand-50 data-[active=true]:text-brand-dark overflow-visible rounded-[7px] transition-colors duration-120 hover:bg-[#f7f7f5] data-[active=true]:font-semibold data-[active=true]:shadow-[inset_0_0_0_0.5px_var(--line-brand)]"
                  >
                    <Link
                      to={href}
                      activeOptions={{ exact: href === '/' }}
                      activeProps={{ 'data-active': 'true' }}
                      inactiveProps={{ 'data-active': undefined }}
                      className="before:bg-brand relative before:absolute before:top-1.5 before:bottom-1.5 before:-left-4 before:w-0.5 before:rounded-none before:opacity-0 before:transition-opacity before:content-[''] data-[active=true]:before:opacity-100"
                    >
                      <span className="text-ink-3 in-data-[active=true]:text-brand duration-120ms transition-colors">
                        <Icon size={15} />
                      </span>
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
        {/* Quick action card */}
        <div className="px-4 pb-3">
          <div className="rounded-lg bg-[linear-gradient(180deg,rgba(15,110,86,0.04),rgba(15,110,86,0.01))] px-2.75 py-2.5 shadow-[0_0_0_0.5px_var(--line-brand)]">
            <div className="mb-1 flex items-center gap-1.5">
              <ActivityIcon size={12} className="text-brand" />
              <span className="text-brand-dark text-[11px] font-semibold tracking-[-0.005em]">
                System healthy
              </span>
            </div>
            <p className="text-ink-3 text-[11px] leading-[1.45]">
              2 of 4 environments running. Last sync{' '}
              <span className="font-mono">2m</span> ago.
            </p>
          </div>
        </div>

        {/* Network status */}
        <div className="border-line-neutral flex items-center justify-between border-t px-5 py-3">
          <div className="text-ink-3 flex items-center gap-1.75">
            <span className="relative flex size-2">
              <span className="bg-running absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
              <span className="bg-running relative inline-flex size-2 rounded-full"></span>
            </span>
            <span className="text-ink-2 text-[11.5px] font-medium">
              Connected
            </span>
            <span className="text-ink-4">·</span>
            <span className="text-ink-4 font-mono text-[10.5px]">SSO ok</span>
          </div>
          <ThemeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
