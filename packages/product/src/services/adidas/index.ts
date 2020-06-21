import { ProductInfo } from '@adidas/declare'
import * as config from 'config'

import { requestGet } from '../../utils'
import { getProductCache, setProductCache } from '../redis'

export async function getProductInfo (
  productId: string,
) {
  const cache = await getProductCache(productId)
  if (cache) {
    return
  }
  const product = await requestGet(`${config.service.adidas}/api/products/${productId}`) as ProductInfo
  await setProductCache(productId, product)
  return product
}
