import { utils } from '@adidas/core'
import fetch from 'node-fetch'

const { logger } = utils

export async function requestGet (url: string) {
  try {
    const result = (await fetch(url)).json()
    return result
  } catch (e) {
    logger.error(e.message, e.stack)
    throw e
  }
}
