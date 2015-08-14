/*
* @Author: CC
* @Date:   2015-08-13 11:44:20
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 14:07:15
*/

import $ from 'superagent'
import token from './token'

export default {
  modifyPassword,
  list,
  updateStatus,
  del,
  resetPassword,
  create,
}

function modifyPassword(oldPwd, newPwd, callback) {
  $.put('/api/user?act=updatePassword').use(token).send({oldPwd, newPwd}).end(callback)
}

function list(params) {
  return $.get('/api/user').use(token).query(params)
}

function updateStatus(params) {
  return $.put('/api/user?act=updateStatus').use(token).send(params)
}

function del(id) {
  return $.del('/api/user').use(token).query({id})
}

function resetPassword(id) {
  return $.put('/api/user?act=resetPassword').use(token).send({id})
}

function create(user, callback) {
  return $.post('/api/user').use(token).send(user).end(callback)
}