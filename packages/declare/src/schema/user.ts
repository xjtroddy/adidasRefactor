export type UserId = string & { kind?: 'UserId' }

export interface UserSchema {
  _id: string,
  name: string,
  password: string,
  admin: boolean,
}
