import { ReviewInfo } from '@adidas/declare'
import * as config from 'config'

import { requestGet } from '../../utils'

export async function getProductReview (
  productId: string,
  token: string,
) {
  const productReview = await requestGet(`${config.service.review}/review/${productId}?token=${token}`) as ReviewInfo
  return productReview
}

