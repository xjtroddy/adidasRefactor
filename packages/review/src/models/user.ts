import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}))
