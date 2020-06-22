import { redis } from '@adidas/core'
import { ProductInfo } from '@adidas/declare'
import * as config from 'config'
import * as CircuitBreaker from 'opossum'

import { requestGet } from '../../utils'


const { getProductCache, setProductCache } = redis

async function getProductInfoOri (
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

export async function getProductInfo (
  productId: string,
) {
  const options = {
    timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
    errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
    resetTimeout: 30000 // After 30 seconds, try again.
  }
  const breaker = new CircuitBreaker(getProductInfoOri, options)
  breaker.on('fallback', () => {
    throw new Error('Sorry, out of service right now')
  })
  return await breaker.fire(productId)
}

