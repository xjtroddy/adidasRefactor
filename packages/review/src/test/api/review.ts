import * as should from 'should'

import { createReview, getReview } from '../utils/review'

// just for example
// todo: use real case
describe('review|one', function () {
  let res: any
  let review: any

  it('one', async function () {
    await createReview()
    res = await getReview()
    review = res.body
    should(review).have.properties({
      name: 'name',
    })
  })
})
