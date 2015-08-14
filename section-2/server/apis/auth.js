/*
* @Author: CC
* @Date:   2015-08-11 12:33:19
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 18:45:28
*/
'use strict'

const UserModel = require('../models/user')
const jwt = require('koa-jwt')
const config = require('../config')

module.exports = function(router) {
  router.post('/api/auth/login', handleLogin)
}

function *handleLogin(next) {
  const body = this.request.body
  this.type = 'json'
  this.assert(body.username, {username: 'empty'}, 400)
  this.assert(body.password, {password: 'empty'}, 400)
  this.assert(body.password.length > 5, {password: 'invalid password'}, 400)

  const user = yield UserModel.findByUsername(body.username)
  this.assert(user, {username: 'not exist'}, 400)
  this.assert(user.comparePassword(body.password), {password: 'invalid password'}, 400)

  const token = jwt.sign(user, config.jwtSecret)
  this.body = { user, token }
}