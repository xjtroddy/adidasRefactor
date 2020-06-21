import { IRouterContext } from 'koa-router'

class ReviewController {
  async getOne (ctx: IRouterContext) {
    const id = req.params.product_id
    con.query('select * from product_reviews where product_id =?', [id], function (err, rows) {
      if (err) throw err
      res.json({
        rows
      })
    })
  }

  async create (ctx: IRouterContext) {
    const input = JSON.parse(JSON.stringify(req.body))
    const data = {
      product_id: input.product_id,
      avg_review_score: input.avg_review_score,
      num_of_reviews: input.num_of_reviews
    }
    con.query('insert into product_reviews set ?', data, function (err, rows) {
      if (err) throw err
      res.json({
        rows
      })
    })
  }

  async update (ctx: IRouterContext) {
    const input = JSON.parse(JSON.stringify(req.body))
    const id = req.params.product_id
    const data = {
      avg_review_score: input.avg_review_score,
      num_of_reviews: input.num_of_reviews
    }
    con.query('update product_reviews set ? where product_id = ?', [data, id], function (err, rows) {
      if (err) throw err
      res.json({
        rows
      })
    })
  }

  async delete (ctx: IRouterContext) {
    const id = req.params.product_id
    con.query('delete from product_reviews where product_id =?', [id], function (err: Error, rows) {
      if (err) throw err
      res.json({
        rows
      })
    })
  }
}

export const reviewController = new ReviewController()
