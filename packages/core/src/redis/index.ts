import * as config from 'config'
import * as Redis from 'ioredis'

let client: any

export function connect () {
  const addrs = config.storage.redis.addr
  client = new Redis(addrs)
}

export function getClient () {
  return client
}

export * from './product'
