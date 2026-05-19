import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
  useLocation,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'

import { useQueryClient } from '@tanstack/react-query'
import type { QueryClient } from '@tanstack/react-query'
import { SidebarProvider } from '#/components/ui/sidebar'
import { AppSidebar } from '#/components/app-sidebar'
import type { Breadcrumb } from '#/components/page-header'
import { useEffect, useRef, useState } from 'react'
import PageHeader from '#/components/page-header'

interface MyRouterContext {
  queryClient: QueryClient
}

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

const PAGE_META: Record<string, { title: string; breadcrumbs: Breadcrumb[] }> =
  {
    '/': {
      title: 'Dashboard',
      breadcrumbs: [{ label: 'MIFI-APP' }, { label: 'Dashboard' }],
    },
    '/deploy': {
      title: 'Deploy',
      breadcrumbs: [{ label: 'MIFI-APP' }, { label: 'Deploy' }],
    },
    '/history': {
      title: 'History',
      breadcrumbs: [{ label: 'MIFI-APP' }, { label: 'History' }],
    },
    '/settings': {
      title: 'Settings',
      breadcrumbs: [{ label: 'MIFI-APP' }, { label: 'Settings' }],
    },
  }

function RootDocument({ children }: { readonly children: React.ReactNode }) {
  const location = useLocation()
  const queryClient = useQueryClient()
  const [network] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    queryClient.invalidateQueries()
    setTimeout(() => setRefreshing(false), 900)
  }

  const handleNewDeploy = () => {
    // nanti: setModalOpen(true)
    console.log('open new deploy modal')
  }

  const handleNewDeployRef = useRef(handleNewDeploy)
  useEffect(() => {
    handleNewDeployRef.current = handleNewDeploy
  })

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault()
        handleNewDeployRef.current()
      }
    }
    globalThis.addEventListener('keydown', onKey)
    return () => globalThis.removeEventListener('keydown', onKey)
  }, [])

  const meta = PAGE_META[location.pathname] ?? {
    title: location.pathname,
    breadcrumbs: [{ label: 'MIFI-APP' }],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className="font-sans wrap-anywhere antialiased">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
            <PageHeader
              title={meta.title}
              breadcrumbs={meta.breadcrumbs}
              network={network}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              onNewDeploy={handleNewDeploy}
            />
            {children}
          </main>
        </SidebarProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
