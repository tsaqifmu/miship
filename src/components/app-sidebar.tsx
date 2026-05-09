import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar'
import { ShipIcon } from './ship-icon'

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2.5 px-5 py-4.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 ring-[0.5px] ring-emerald-700/20">
            <ShipIcon size={17} />
          </span>
          <div className="flex flex-col justify-center gap-0.5">
            <span className="text-sm font-semibold">MiShip</span>
            <span className="font-mono text-[10.5px] text-[#9898f]">
              v2.4.1
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup></SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
