import { middleware, mongo, utils } from '@adidas/core'
import * as config from 'config'
import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'

import { apiRouter, rootRouter } from './router'


const { logger } = utils
const pkg = require('../package.json')
const env = process.env.NODE_ENV

const app = new Koa()
app.use(middleware.protectApp)
app.use(middleware.log)
app.use(bodyparser())
app.use(middleware.ratelimiter())
app.use(apiRouter.routes())
app.use(rootRouter.routes())
const port = process.env.PORT || config.app.port || 3000

logger.info({
  class: 'start',
  message: 'Connecting mongo',
})
mongo.connect()

logger.info({
  class: 'start',
  message: 'Connecting mysql',
})

app.listen(port, () => logger.info({
  class: 'start',
  name: pkg.name,
  version: pkg.version,
  env,
  port,
}))
