import { mysql } from '@adidas/core'
import { IRouterContext } from 'koa-router'


class ReviewController {
  async getOne (ctx: IRouterContext) {
    const { productId } = ctx.params
    const review = await mysql.review.getReviewByProductId(productId)
    ctx.body = review
  }

  async create (ctx: IRouterContext) {
    const { productId, avg_review_score, num_of_reviews } = ctx.body
    const review = await mysql.review.createReview(productId, avg_review_score, num_of_reviews)

    ctx.body = review
  }

  async update (ctx: IRouterContext) {
    const { productId } = ctx.params
    const { avg_review_score, num_of_reviews } = ctx.body
    const review = await mysql.review.updateReviewByProductId(productId, avg_review_score, num_of_reviews)
    ctx.body = review
  }

  async delete (ctx: IRouterContext) {
    const { productId } = ctx.params
    await mysql.review.getReviewByProductId(productId)
    ctx.body = {
      success: true
    }
  }
}

export const reviewController = new ReviewController()
