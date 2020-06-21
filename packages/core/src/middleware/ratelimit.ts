
import * as config from 'config'
import { Context } from 'koa'
import * as ratelimit from 'koa-ratelimit'
import * as _ from 'lodash'

import * as redis from '../redis'

export function ratelimiter () {
  if (_.get(config, 'feature.free', false)) {
    return (_ctx: any, next: any) => {
      return next()
    }
  } else {
    return ratelimit({
      driver: 'redis',
      db: redis.getClient(),
      duration: 60000,
      errorMessage: 'Sometimes You Just Have to Slow Down.',
      id: (ctx: Context) => ctx.state.user ? String(ctx.state.user._id) : ctx.headers['x-real-ip'] || ctx.ip,
      headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total',
      },
      max: 500,
      disableHeader: false,
    })
  }
}
