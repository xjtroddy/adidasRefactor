import * as should from 'should'

import { createReview, getReview } from '../utils/review'

// just for example
// todo: use real case
describe('review|one', () => {
  let res: any
  let review: any

  it('one', async () => {
    await createReview()
    res = await getReview()
    review = res.body
    should(review).have.properties({
      name: 'name',
    })
  })
})
