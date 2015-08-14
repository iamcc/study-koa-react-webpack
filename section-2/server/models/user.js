/* 
* @Author: CC
* @Date:   2015-08-11 12:45:17
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 15:59:11
*/
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const roles = ['admin', 'sales']
const UserSchema = new Schema({
  username: String,
  password: String,
  role: { type: String, default: 'sales' },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  deleted: Boolean,
})
UserSchema.index({ username: 1 }, { unique: 1 })
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
module.exports.ROLES = roles

function md5(str) {
  return require('crypto').createHash('md5').update(str).digest('hex')
}

function preSave(next) {
  if (this.isNew || this.isModified('password'))
    this.password = md5(this.password)

  next()
}

function comparePassword(pwd) {
  return this.password === md5(pwd)
}

function findByUsername(uname) {
  return this.findOne({ username: uname }).exec()
}