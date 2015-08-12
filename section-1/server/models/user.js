/* 
* @Author: CC
* @Date:   2015-08-11 12:45:17
* @Last Modified by:   CC
* @Last Modified time: 2015-08-11 14:44:55
*/
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const roles = ['admin', 'sales']

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  role: { type: String, enum: roles, default: 'sales' },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

UserSchema.pre('save', preSave)
UserSchema.methods = {
  comparePassword
}
UserSchema.statics = {
  findByUsername
}
UserSchema.options = {
  toJSON: {
    transform(doc, ret, opts) {
      delete ret.password
      delete ret.__v
    }
  }
}

module.exports = mongoose.model('User', UserSchema)

function md5(str) {
  return require('crypto').createHash('md5').update(str).digest('hex')
}

function preSave(next) {
  if (!this.isModified('password')) return next()

  this.password = md5(this.password)
  next()
}

function comparePassword(pwd) {
  return this.password === md5(pwd)
}

function *findByUsername(uname) {
  return this.findOne({ username: uname }).exec()
}