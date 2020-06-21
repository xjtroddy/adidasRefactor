import * as config from 'config'

import { requestGet } from '../../utils'

export async function getProductInfo (
  productId: string,
) {
  const product = await requestGet(`${config.service.adidas}/api/products/${productId}`) as ProductInfo
  return product
}

interface ProductInfo {
  id: string,
  name: string,
}
