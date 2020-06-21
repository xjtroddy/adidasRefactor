import { IRouterContext } from 'koa-router'
import { mongo } from '@adidas/core'

class UserController {
  async getAllUsers (ctx: IRouterContext) {
    const users = await mongo.user.getAllUser()
    ctx.body = users
  }
}

export const userController = new UserController()
