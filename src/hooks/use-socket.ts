import { getSocket } from '#/lib/socket'
import { useEffect } from 'react'

export function useSocket<T>(event: string, handler: (data: T) => void) {
  useEffect(() => {
    const socket = getSocket()
    socket.on(event, handler)
    return () => {
      socket.off(event, handler)
    }
  }, [event, handler])
}
