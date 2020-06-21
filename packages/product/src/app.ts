import { utils } from '@adidas/core'
import * as config from 'config'
import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'

import router from './router'
import * as redisService from './services/redis'

const pkg = require('../package.json')
const env = process.env.NODE_ENV
const { logger } = utils

logger.info({
  class: 'start',
  message: 'Connecting redis',
})
redisService.connect()

const app = new Koa()
app.use(bodyparser())
app.use(router.routes())
const port = process.env.PORT || config.app.port || 3000

app.listen(port, () => logger.info({
  class: 'start',
  name: pkg.name,
  version: pkg.version,
  env,
  port,
}))
