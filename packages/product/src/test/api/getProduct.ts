// import * as qs from 'querystring'
import * as should from 'should'

import { createProduct, getProduct } from './utils/product'

// just for example
// todo: use real case
describe('product|one', function () {
  let res: any
  let product: any

  it('one', async function () {
    await createProduct()
    res = await getProduct()
    product = res.body
    should(product).have.properties({
      name: 'name',
    })
  })
})
