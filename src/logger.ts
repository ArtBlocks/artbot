import { Logger } from './Utils/logger'

const devMode = process.env.NODE_ENV !== 'production'

export const logger = Logger({
  serviceName: 'artbot',
  devMode,
})
