import { logger } from '../logger'

export type Destination = 'discord' | 'twitter'

/**
 * Stable log fields for Datadog monitors:
 * - alert:destination_down     — page while a destination is unavailable
 * - alert:destination_recovered — clear the page
 *
 * The error is emitted on the transition to down and again every
 * ALERT_HEARTBEAT_MS while it stays down. Retries in between are warnings
 * so a sustained outage does not emit an error on every attempt.
 */
const ALERT_HEARTBEAT_MS = 15 * 60 * 1000

type DownState = {
  downSince: number
  lastAlertAt: number
}

const downState: Record<Destination, DownState | null> = {
  discord: null,
  twitter: null,
}

export function reportDestinationDown(
  destination: Destination,
  reason: string,
  fields: Record<string, unknown> = {}
) {
  const now = Date.now()
  const current = downState[destination]
  const shouldAlert =
    !current || now - current.lastAlertAt >= ALERT_HEARTBEAT_MS

  if (!current) {
    downState[destination] = { downSince: now, lastAlertAt: now }
  } else if (shouldAlert) {
    current.lastAlertAt = now
  }

  const downSince = downState[destination]?.downSince ?? now
  const payload = {
    destination,
    reason,
    downSince: new Date(downSince).toISOString(),
    ...fields,
  }

  if (shouldAlert) {
    logger.error(
      { alert: 'destination_down', ...payload },
      'Destination unavailable'
    )
  } else {
    logger.warn(payload, 'Destination still unavailable')
  }
}

export function reportDestinationUp(destination: Destination) {
  const current = downState[destination]
  if (!current) {
    return
  }

  const downMs = Date.now() - current.downSince
  downState[destination] = null
  logger.info(
    { alert: 'destination_recovered', destination, downMs },
    'Destination recovered'
  )
}
