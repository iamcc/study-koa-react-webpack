/*
* @Author: CC
* @Date:   2015-08-11 12:33:19
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 14:12:54
*/
'use strict'

const UserModel = require('../models/user')
const jwt = require('koa-jwt')
const config = require('../config')

module.exports = function(router) {
  router.post('/api/auth/login', handleLogin)
}

function *handleLogin(next) {
  /* istanbul ignore if */
  if (global.debug) yield wait(3000 * Math.random())

  const body = this.request.body
  this.type = 'json'
  this.assert(body.username, {username: '用户名不能空'}, 400)
  this.assert(body.password, {password: '密码不能空'}, 400)
  this.assert(body.password.length > 5, {password: '密码错误'}, 400)

  const user = yield UserModel.findByUsername(body.username)
  this.assert(user, {username: '用户名不存在'}, 400)
  this.assert(user.comparePassword(body.password), {password: '密码错误'}, 400)

  const token = jwt.sign(user, config.jwtSecret)
  this.body = { user, token }
}

/* istanbul ignore next */
function wait(ms) {
  return function(callback) {
    setTimeout(callback, ms)
  }
}