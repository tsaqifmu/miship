import { io } from 'socket.io-client'
import type { Socket } from 'socket.io-client'

let _socket: Socket | null = null

export function getSocket(): Socket {
  if (typeof globalThis.window === 'undefined')
    throw new Error('Socket called on server')
  if (!_socket) {
    _socket = io(import.meta.env.VITE_API_URL, {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: Infinity,
    })
  }
  return _socket
}
