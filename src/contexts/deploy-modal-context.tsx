import type { Environment } from '#/types/environment'
import { createContext, useContext, useState } from 'react'

interface DeployModalContextValue {
  // compose modal
  open: (env?: Environment) => void
  close: () => void
  isOpen: boolean
  defaultEnv: Environment | null

  // progress sheet
  activeDeployId: string | null
  openProgress: (deployId: string) => void
  closeProgress: () => void
}

const DeployModalContext = createContext<DeployModalContextValue | null>(null)

export function DeployModalProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [activeDeployId, setActiveDeployId] = useState<string | null>(null)
  const openProgress = (deployId: string) => setActiveDeployId(deployId)
  const closeProgress = () => setActiveDeployId(null)
  const [isOpen, setIsOpen] = useState(false)
  const [defaultEnv, setDefaultEnv] = useState<Environment | null>(null)

  const open = (env?: Environment) => {
    setDefaultEnv(env ?? null)
    setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
    setDefaultEnv(null)
  }

  return (
    <DeployModalContext
      value={{
        open,
        close,
        isOpen,
        defaultEnv,
        activeDeployId,
        openProgress,
        closeProgress,
      }}
    >
      {children}
    </DeployModalContext>
  )
}

export function useDeployModal() {
  const ctx = useContext(DeployModalContext)
  if (!ctx)
    throw new Error('useDeployModal must be used inside DeployModalProvider')
  return ctx
}
