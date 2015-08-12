/*
* @Author: CC
* @Date:   2015-08-11 12:36:53
* @Last Modified by:   CC
* @Last Modified time: 2015-08-11 14:24:53
*/
'use strict'

const mongoose = require('mongoose')
const co = require('koa/node_modules/co')
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
  co(UserModel.findByUsername('admin'))
    .then(handleResult)
    .catch(callback)

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
