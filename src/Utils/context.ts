import { AsyncLocalStorage } from 'async_hooks'

type LogContext = {
  requestId?: string
  [key: string]: unknown
}

const storage = new AsyncLocalStorage<LogContext>()

export const logContext = <T>(context: LogContext, fn: () => T): T => {
  return storage.run(context, fn)
}

export const getRequestId = (): string | undefined => {
  return storage.getStore()?.requestId
}
