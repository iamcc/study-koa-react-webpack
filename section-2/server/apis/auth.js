/*
* @Author: CC
* @Date:   2015-08-11 12:33:19
* @Last Modified by:   CC
* @Last Modified time: 2015-08-17 15:45:20
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
  this.assert(body.username, {username: 'should not be empty'}, 400)
  this.assert(body.password, {password: 'should not be empty'}, 400)
  this.assert(body.password.length > 5, {password: 'invalid password'}, 400)

  const user = yield UserModel.findByUsername(body.username)
  this.assert(user, {username: 'not exist'}, 400)
  this.assert(user.comparePassword(body.password), {password: 'invalid password'}, 400)

  const token = jwt.sign(user, config.jwtSecret)
  this.body = { user, token }
}