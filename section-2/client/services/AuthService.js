/*
* @Author: CC
* @Date:   2015-08-11 18:47:05
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 15:28:54
*/

import $ from 'superagent'
import token from './token'

export default {
  login
}

function login(username, password, callback) {
  return $.post('/api/auth/login').send({username, password}).end(callback)
}