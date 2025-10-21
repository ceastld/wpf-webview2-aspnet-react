import { useEffect, useState } from 'react'
import { buildConnection } from '../utils/api'

/**
 * Simple hook for real-time SignalR connection
 * @returns {any} - The real-time data
 */
export function useRealtime(): string {
  const [data, setData] = useState<string>(new Date().toLocaleTimeString())

  useEffect(() => {
    const connection = buildConnection('hub/clock')

    connection.on('ReceiveTime', setData)

    connection.start()
      .then(() => console.log("Connected to SignalR"))
      .catch((err: Error) => console.error("SignalR connection error:", err))

    return () => {
      connection.stop().catch(console.error);
    }
  }, [])

  return data
}
