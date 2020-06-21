import { logger } from '../utils'

const pkg = require('../../../../package.json')

export async function log (ctx: any, next: any) {
  const start = new Date().valueOf()

  try {
    await next()
  } catch (err) {
    process.nextTick(() => logError(ctx, err, start))
    throw err
  }

  process.nextTick(() => logInfo(ctx, start))
}

function logInfo (ctx: any, startTime: number) {
  const info = {
    requestId: ctx.requestId,
    class: pkg.name,
    ip: ctx.headers['x-real-ip'] || ctx.ip || '-',
    method: ctx.method,
    url: ctx.originalUrl,
    status: ctx.status,
    userId: ctx.state.user && ctx.state.user._id,
    start: startTime,
    time: new Date().valueOf() - startTime,
    userAgent: ctx.get('user-agent'),
    ...ctx.gta,
  }
  if (ctx._matchedRoute) {
    info.route = `${ctx.method} ${ctx._matchedRoute}`
  }
  logger.info(info)
}

function logError (ctx: any, err: any, startTime: number) {

  logger.error({
    class: pkg.name,
    ip: ctx.headers['x-real-ip'] || ctx.ip || '-',
    method: ctx.method,
    url: ctx.originalUrl,
    status: 500,
    userId: ctx.state.user && ctx.state.user._id,
    start: startTime,
    time: new Date().valueOf() - startTime,
    userAgent: ctx.get('user-agent'),
    appErrorMessage: err.message,
    appErrorStack: err.stack,
  })
}
