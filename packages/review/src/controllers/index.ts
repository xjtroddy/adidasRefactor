import * as config from 'config'
import { mongo } from '@adidas/core'
import { IRouterContext } from 'koa-router'
import * as jwt from 'jsonwebtoken'

export * from './user'
export * from './review'

class Controller {
  async root (ctx: IRouterContext) {
    ctx.body = `Hello! The API is running at http://localhost:${config.app.port}`
  }

  async setup (ctx: IRouterContext) {
    await mongo.user.createUser('default', 'password', true)
    ctx.body = {
      success: true
    }
  }

  async authenicate (ctx: IRouterContext) {
    const { name, password } = ctx.body
    const user = await mongo.user.findOne(name)
    if (!user) {
      return ctx.body = {
        success: false,
        message: 'Authentication failed. User not found.'
      }
    }
    if (user.password !== password) {
      return ctx.body = {
        success: false,
        message: 'Authentication failed. Wrong password.'
      }
    }
    const payload = {
      admin: user.admin
    }
    const token = jwt.sign(payload, config.app.secret, {
      expiresIn: 1440
    })

    return ctx.body = {
      success: true,
      message: 'Enjoy your token!',
      token,
    }
  }

  async api (ctx: IRouterContext) {
    ctx.body = ({
      message: 'Welcome to the product reviews API'
    })
  }
}

export const controller = new Controller()
