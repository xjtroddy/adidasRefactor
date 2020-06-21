import * as KoaRouter from 'koa-router'

import { controller, userController, reviewController } from './controllers'

export const apiRouter = new KoaRouter({ prefix: '/api' })

export const rootRouter = new KoaRouter()

rootRouter.get('/', controller.root)

rootRouter.get('/setup', controller.setup)

rootRouter.post('/authenticate', controller.authenicate)

apiRouter.get('/api', controller.api)

apiRouter.get('/api/users', userController.getAllUsers)

apiRouter.get('/api/review/:productId', reviewController.getOne)

apiRouter.post('/api/review', reviewController.create)

apiRouter.put('/api/review/:productId', reviewController.update)

apiRouter.delete('/api/review/:productId', reviewController.delete)

