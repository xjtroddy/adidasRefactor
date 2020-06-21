import { IRouterContext } from 'koa-router'

import * as adidasService from '../services/adidas'
import * as reviewService from '../services/review'

class ProductController {
  async getOne (ctx: IRouterContext ) {
    const { productId } = ctx.params
    const { token } = ctx.query
    const [ product, review ] = await Promise.all([
      adidasService.getProductInfo(productId),
      reviewService.getProductReview(productId, token)
    ])

    const rows = review.rows

    const result = {
      reviews: rows,
      product,
    }
    ctx.body = result
  }
}

export const productController = new ProductController ()
