import {
  UserSchema,
} from '@adidas/declare'
import { Schema, SchemaOptions, SchemaTypeOpts } from 'mongoose'

export enum CollectionName {
  USER = 'user'
}

type required<T> = {
  [K in keyof T] - ?: T[K]
}

type SchemaDefinition<T> = {
  [K in keyof required<T>]: SchemaTypeOpts<any>
}

export function createUserSchema () {
  const defination: SchemaDefinition<UserSchema> = {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    // must be secret
    password: {
      type: Schema.Types.String,
      required: true,
    },
    admin: {
      type: Schema.Types.Boolean
    }
  }

  const options: SchemaOptions = {
    read: 'secondaryPreferred',
  }

  return new Schema(defination, options)
}
