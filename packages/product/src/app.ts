import { utils } from '@adidas/core'
import * as config from 'config'
import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'

import router from './router'

const pkg = require('../package.json')
const env = process.env.NODE_ENV
const { logger } = utils

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
