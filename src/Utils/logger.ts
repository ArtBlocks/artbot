import pino from 'pino'
import { getRequestId } from './context'

export { logContext, getRequestId } from './context'

export const Logger = ({
  serviceName,
  devMode,
}: {
  /**
   * The name of the service to show in logs metadata
   *
   * process.env.SERVICE_NAME will overwrite this value
   */
  serviceName?: string

  /** If this is local development (pretty print the logs, etc) */
  devMode?: boolean
  /**
   * The log level to show. Defaults to "debug"
   *
   * process.env.LOG_LEVEL will overwrite this value
   */
  level?: pino.Level
}) => {
  // Datadog tags
  const datadogTags = {}

  const baseLogOptions = !devMode
    ? {
        service: process.env.SERVICE_NAME || serviceName,
        ddtags: buildDatadogTags(datadogTags),
      }
    : undefined

  // setup logging options
  const options: pino.LoggerOptions = {
    level: process.env.LOG_LEVEL || 'debug',
    base: baseLogOptions,
    transport: devMode
      ? {
          target: 'pino-pretty',
        }
      : undefined,
    formatters: {
      level: (label) => {
        // use the name of the level instead of the number
        return { level: label }
      },
    },
    mixin() {
      const requestId = getRequestId()
      return requestId ? { requestId } : {}
    },
  }

  return pino(options)
}

const buildDatadogTags = (tags: Record<string, string | undefined>) => {
  return Object.entries(tags)
    .filter(([_key, value]) => value !== undefined)
    .map(([key, value]) => `${key}:${value}`)
    .join(',')
}
