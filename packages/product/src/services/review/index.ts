import * as config from 'config'

import { requestGet } from '../../utils'

export async function getProductReview (
  productId: string,
  token: string,
) {
  const productReview = await requestGet(`${config.service.review}/review/${productId}?token=${token}`) as ReviewInfo
  return productReview
}

interface ReviewInfo {
  id: string,
  name: string,
  review: string,
  rows: string[],
}
