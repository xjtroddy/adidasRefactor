import * as KoaRouter from 'koa-router'

import { productController } from './controllers'

const router = new KoaRouter({ prefix: '/api' })

router.get('/product/:productId', productController.getOne)

export default router
