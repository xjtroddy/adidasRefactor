import * as config from 'config'
import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'

import router from './router'

const app = new Koa()
app.use(bodyparser())
app.use(router.routes())
const PORT = process.env.PORT || config.app.port || 3000

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))
