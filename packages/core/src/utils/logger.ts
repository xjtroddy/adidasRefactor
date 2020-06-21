import * as config from 'config'
import { createLogger, format, transports } from 'winston'

export const logger = createLogger({
  level: config.app.logLevel || 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [new transports.Console()],
})
