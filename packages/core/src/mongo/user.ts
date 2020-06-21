import { UserSchema } from "@adidas/declare"
import { getClient } from './init'
import * as mongoose from 'mongoose'
import { CollectionName } from './schemas'

function getUserModel (): mongoose.Model<any> {
  const client = getClient()
  return client[CollectionName.USER]
}

export async function getAllUser (): Promise<UserSchema[]> {
  const userModel = getUserModel()
  return await userModel.find({}).lean()
}

export async function createUser (
  name: string,
  password: string,
  admin: boolean,
) {
  const userModel = getUserModel()
  await userModel.create({
    _id: mongoose.Types.ObjectId(),
    name,
    password,
    admin,
  })
}

export async function findOne (
  name: string,
): Promise<UserSchema>{
  const userModel = getUserModel()
  return await userModel.findOne({
    name
  })
}
