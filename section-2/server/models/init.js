/*
* @Author: CC
* @Date:   2015-08-11 12:36:53
* @Last Modified by:   CC
* @Last Modified time: 2015-08-17 15:50:08
*/
'use strict'

const mongoose = require('mongoose')
const config = require('../config')
const UserModel = require('./user')

mongoose.connect(config.mongoUrl)
mongoose.connection
  .on('error', /* istanbul ignore next */ function(e) {
    console.error('mongoose connection error', e)
  })
  .once('open', initAdmin)

module.exports = initAdmin

function initAdmin(callback) {
  callback = callback || function () {}

  UserModel.findByUsername('admin')
    .then(handleResult, callback)

  function handleResult(user) {
    if (!!user) return callback()

    const admin = {
      username: 'admin',
      password: '123456',
      role: 'admin'
    }
    UserModel.create(admin, callback)
  }
}
