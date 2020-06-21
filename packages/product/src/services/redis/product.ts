import { ProductInfo } from '@adidas/declare'

import * as redisService from '.'

// product cache overtime is 1 day
const productCacheOvertime = 24 * 60 * 60 * 1000

export async function setProductCache (
  productId: string,
  product: ProductInfo
) {
  const redisClient = redisService.getClient()
  return await redisClient.set(
    `product_info_${productId}`,
    JSON.stringify(product),
    'NX',
    'PX',
    productCacheOvertime,
  )
}

export async function getProductCache (productId: string) {
  const redisClient = redisService.getClient()
  return await redisClient.get(`product_info_${productId}`)
}
