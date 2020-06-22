import 'reflect-metadata'

import * as config from 'config'
import { Connection, createConnection } from 'typeorm'

import { Review } from './entity/Review'

let client: Connection

export function getClient() {
  return client
}

export async function initClient(){
  const conn = await createConnection({
    type: 'mysql',
    host: config.storage.mysql.addr,
    port: 3306,
    username: config.storage.mysql.user,
    password: config.storage.mysql.password,
    database: config.storage.mysql.name,
    entities: [
      Review
    ],
    synchronize: true,
    logging: false
  })

  client = conn
}
